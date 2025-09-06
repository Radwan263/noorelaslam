from flask import Blueprint, request, jsonify
from .. import db
from ..models import SadaqaJariya, User

sadaqa_bp = Blueprint('sadaqa_bp', __name__)

@sadaqa_bp.route('/sadaqa', methods=['GET'])
def get_all_sadaqa():
    try:
        all_requests = SadaqaJariya.query.order_by(SadaqaJariya.created_at.desc()).all()
        return jsonify([req.to_dict() for req in all_requests]), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch data', 'details': str(e)}), 500

@sadaqa_bp.route('/sadaqa', methods=['POST'])
def add_sadaqa_request():
    data = request.get_json()
    if not data or 'person_name' not in data or not data['person_name'].strip():
        return jsonify({'error': 'person_name is required'}), 400
    try:
        current_user_id = 1 
        new_request = SadaqaJariya(
            person_name=data['person_name'],
            description=data.get('description', ''),
            category=data.get('category', 'General'),
            user_id=current_user_id
        )
        db.session.add(new_request)
        db.session.commit()
        return jsonify(new_request.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to save request', 'details': str(e)}), 500

@sadaqa_bp.route('/sadaqa/<int:id>/supplicate', methods=['POST'])
def supplicate_for_person(id):
    try:
        sadaqa_request = SadaqaJariya.query.get_or_404(id)
        if sadaqa_request.supplication_count is None:
            sadaqa_request.supplication_count = 0
        sadaqa_request.supplication_count += 1
        sadaqa_request.last_supplicated_at = db.func.current_timestamp()
        db.session.commit()
        return jsonify(sadaqa_request.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update supplications', 'details': str(e)}), 500
