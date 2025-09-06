from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.duas import Duas, CustomDuas

duas_bp = Blueprint('duas', __name__)

@duas_bp.route('/duas', methods=['GET'])
def get_duas():
    """الحصول على الأدعية"""
    category = request.args.get('category')
    
    if category:
        duas = Duas.query.filter_by(category=category).all()
    else:
        duas = Duas.query.all()
    
    return jsonify([dua.to_dict() for dua in duas])

@duas_bp.route('/duas/categories', methods=['GET'])
def get_duas_categories():
    """الحصول على فئات الأدعية المتاحة"""
    categories = db.session.query(Duas.category).distinct().all()
    return jsonify([category[0] for category in categories])

@duas_bp.route('/duas/custom', methods=['GET'])
def get_custom_duas():
    """الحصول على الأدعية المخصصة للمستخدم"""
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400
    
    custom_duas = CustomDuas.query.filter_by(user_id=user_id).all()
    return jsonify([dua.to_dict() for dua in custom_duas])

@duas_bp.route('/duas/custom', methods=['POST'])
def add_custom_dua():
    """إضافة دعاء مخصص للمستخدم"""
    data = request.get_json()
    
    if not data or 'user_id' not in data or 'text' not in data:
        return jsonify({'error': 'user_id and text are required'}), 400
    
    custom_dua = CustomDuas(
        user_id=data['user_id'],
        text=data['text']
    )
    
    db.session.add(custom_dua)
    db.session.commit()
    
    return jsonify(custom_dua.to_dict()), 201

@duas_bp.route('/duas/custom/<int:dua_id>', methods=['DELETE'])
def delete_custom_dua(dua_id):
    """حذف دعاء مخصص"""
    custom_dua = CustomDuas.query.get_or_404(dua_id)
    
    db.session.delete(custom_dua)
    db.session.commit()
    
    return jsonify({'message': 'Custom dua deleted successfully'})

@duas_bp.route('/duas/search', methods=['GET'])
def search_duas():
    """البحث في الأدعية"""
    query = request.args.get('q')
    if not query:
        return jsonify({'error': 'Search query is required'}), 400
    
    duas_results = Duas.query.filter(
        Duas.text.contains(query)
    ).limit(20).all()
    
    return jsonify([dua.to_dict() for dua in duas_results])

