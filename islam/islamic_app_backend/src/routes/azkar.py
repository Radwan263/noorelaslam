from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.azkar import Azkar, CustomAzkar

azkar_bp = Blueprint('azkar', __name__)

@azkar_bp.route('/azkar', methods=['GET'])
def get_azkar():
    """الحصول على جميع الأذكار أو حسب الفئة"""
    category = request.args.get('category')
    
    if category:
        azkar = Azkar.query.filter_by(category=category).all()
    else:
        azkar = Azkar.query.all()
    
    return jsonify([azkar_item.to_dict() for azkar_item in azkar])

@azkar_bp.route('/azkar/categories', methods=['GET'])
def get_azkar_categories():
    """الحصول على فئات الأذكار المتاحة"""
    categories = db.session.query(Azkar.category).distinct().all()
    return jsonify([category[0] for category in categories])

@azkar_bp.route('/azkar/custom', methods=['GET'])
def get_custom_azkar():
    """الحصول على الأذكار المخصصة للمستخدم"""
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400
    
    custom_azkar = CustomAzkar.query.filter_by(user_id=user_id).all()
    return jsonify([azkar.to_dict() for azkar in custom_azkar])

@azkar_bp.route('/azkar/custom', methods=['POST'])
def add_custom_azkar():
    """إضافة ذكر مخصص للمستخدم"""
    data = request.get_json()
    
    if not data or 'user_id' not in data or 'text' not in data:
        return jsonify({'error': 'user_id and text are required'}), 400
    
    custom_azkar = CustomAzkar(
        user_id=data['user_id'],
        text=data['text'],
        count=data.get('count', 1)
    )
    
    db.session.add(custom_azkar)
    db.session.commit()
    
    return jsonify(custom_azkar.to_dict()), 201

@azkar_bp.route('/azkar/custom/<int:azkar_id>', methods=['DELETE'])
def delete_custom_azkar(azkar_id):
    """حذف ذكر مخصص"""
    custom_azkar = CustomAzkar.query.get_or_404(azkar_id)
    
    db.session.delete(custom_azkar)
    db.session.commit()
    
    return jsonify({'message': 'Custom azkar deleted successfully'})

