from flask import Blueprint, request, jsonify
from src.models.hadith import Hadith

hadith_bp = Blueprint('hadith', __name__)

@hadith_bp.route('/hadith', methods=['GET'])
def get_hadith():
    """الحصول على الأحاديث"""
    book = request.args.get('book')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    query = Hadith.query
    
    if book:
        query = query.filter_by(book=book)
    
    hadith_pagination = query.paginate(
        page=page, 
        per_page=per_page, 
        error_out=False
    )
    
    return jsonify({
        'hadith': [hadith.to_dict() for hadith in hadith_pagination.items],
        'total': hadith_pagination.total,
        'pages': hadith_pagination.pages,
        'current_page': page
    })

@hadith_bp.route('/hadith/books', methods=['GET'])
def get_hadith_books():
    """الحصول على كتب الأحاديث المتاحة"""
    from src.models.user import db
    books = db.session.query(Hadith.book).distinct().all()
    return jsonify([book[0] for book in books])

@hadith_bp.route('/hadith/<int:hadith_id>', methods=['GET'])
def get_hadith_by_id(hadith_id):
    """الحصول على حديث محدد"""
    hadith = Hadith.query.get_or_404(hadith_id)
    return jsonify(hadith.to_dict())

@hadith_bp.route('/hadith/search', methods=['GET'])
def search_hadith():
    """البحث في الأحاديث"""
    query = request.args.get('q')
    if not query:
        return jsonify({'error': 'Search query is required'}), 400
    
    hadith_results = Hadith.query.filter(
        Hadith.text.contains(query)
    ).limit(20).all()
    
    return jsonify([hadith.to_dict() for hadith in hadith_results])

