from flask import Blueprint, request, jsonify
import requests
from src.models.user import db
from src.models.quran import QuranText, QuranTafseer, QuranAudio, UserBookmarks

quran_bp = Blueprint('quran', __name__)

@quran_bp.route('/quran/suras', methods=['GET'])
def get_suras():
    """الحصول على قائمة السور من Al Quran Cloud API"""
    try:
        response = requests.get('http://api.alquran.cloud/v1/meta')
        if response.status_code == 200:
            data = response.json()
            return jsonify(data['data']['surahs']['references'])
        else:
            return jsonify({'error': 'Failed to fetch suras'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@quran_bp.route('/quran/sura/<int:sura_number>', methods=['GET'])
def get_sura(sura_number):
    """الحصول على سورة كاملة"""
    try:
        response = requests.get(f'http://api.alquran.cloud/v1/surah/{sura_number}')
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch sura'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@quran_bp.route('/quran/aya/<int:sura_number>/<int:aya_number>', methods=['GET'])
def get_aya(sura_number, aya_number):
    """الحصول على آية محددة"""
    try:
        response = requests.get(f'http://api.alquran.cloud/v1/ayah/{sura_number}:{aya_number}')
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch aya'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@quran_bp.route('/quran/search', methods=['GET'])
def search_quran():
    """البحث في القرآن الكريم"""
    query = request.args.get('q')
    if not query:
        return jsonify({'error': 'Search query is required'}), 400
    
    try:
        response = requests.get(f'http://api.alquran.cloud/v1/search/{query}/all/ar')
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to search'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@quran_bp.route('/quran/audio/reciters', methods=['GET'])
def get_reciters():
    """الحصول على قائمة القراء"""
    try:
        response = requests.get('http://api.alquran.cloud/v1/edition/format/audio')
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch reciters'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@quran_bp.route('/quran/audio/<reciter>/<int:sura_number>', methods=['GET'])
def get_audio_sura(reciter, sura_number):
    """الحصول على تلاوة صوتية لسورة"""
    try:
        response = requests.get(f'http://api.alquran.cloud/v1/surah/{sura_number}/{reciter}')
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch audio'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@quran_bp.route('/quran/tafseer/<int:sura_number>/<int:aya_number>', methods=['GET'])
def get_tafseer(sura_number, aya_number):
    """الحصول على تفسير آية"""
    tafseer_source = request.args.get('source', 'ar.jalalayn')  # تفسير الجلالين كافتراضي
    
    try:
        response = requests.get(f'http://api.alquran.cloud/v1/ayah/{sura_number}:{aya_number}/{tafseer_source}')
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch tafseer'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@quran_bp.route('/quran/bookmarks', methods=['GET'])
def get_user_bookmarks():
    """الحصول على علامات المستخدم المرجعية"""
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400
    
    bookmarks = UserBookmarks.query.filter_by(user_id=user_id).all()
    return jsonify([bookmark.to_dict() for bookmark in bookmarks])

@quran_bp.route('/quran/bookmarks', methods=['POST'])
def add_bookmark():
    """إضافة علامة مرجعية"""
    data = request.get_json()
    
    if not data or 'user_id' not in data or 'sura_id' not in data or 'aya_id' not in data:
        return jsonify({'error': 'user_id, sura_id, and aya_id are required'}), 400
    
    # التحقق من عدم وجود نفس العلامة المرجعية
    existing = UserBookmarks.query.filter_by(
        user_id=data['user_id'],
        sura_id=data['sura_id'],
        aya_id=data['aya_id']
    ).first()
    
    if existing:
        return jsonify({'error': 'Bookmark already exists'}), 400
    
    bookmark = UserBookmarks(
        user_id=data['user_id'],
        sura_id=data['sura_id'],
        aya_id=data['aya_id']
    )
    
    db.session.add(bookmark)
    db.session.commit()
    
    return jsonify(bookmark.to_dict()), 201

@quran_bp.route('/quran/bookmarks/<int:bookmark_id>', methods=['DELETE'])
def delete_bookmark(bookmark_id):
    """حذف علامة مرجعية"""
    bookmark = UserBookmarks.query.get_or_404(bookmark_id)
    
    db.session.delete(bookmark)
    db.session.commit()
    
    return jsonify({'message': 'Bookmark deleted successfully'})

