from flask import Blueprint, request, jsonify
import requests

prayer_times_bp = Blueprint('prayer_times', __name__)

@prayer_times_bp.route('/prayer-times', methods=['GET'])
def get_prayer_times():
    """الحصول على أوقات الصلاة بناءً على الموقع"""
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    method = request.args.get('method', '2')  # طريقة الحساب (افتراضي: ISNA)
    
    if not latitude or not longitude:
        return jsonify({'error': 'latitude and longitude are required'}), 400
    
    try:
        url = f'http://api.aladhan.com/v1/timings'
        params = {
            'latitude': latitude,
            'longitude': longitude,
            'method': method
        }
        
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch prayer times'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@prayer_times_bp.route('/prayer-times/monthly', methods=['GET'])
def get_monthly_prayer_times():
    """الحصول على أوقات الصلاة لشهر كامل"""
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    month = request.args.get('month')
    year = request.args.get('year')
    method = request.args.get('method', '2')
    
    if not all([latitude, longitude, month, year]):
        return jsonify({'error': 'latitude, longitude, month, and year are required'}), 400
    
    try:
        url = f'http://api.aladhan.com/v1/calendar'
        params = {
            'latitude': latitude,
            'longitude': longitude,
            'month': month,
            'year': year,
            'method': method
        }
        
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch monthly prayer times'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@prayer_times_bp.route('/prayer-times/methods', methods=['GET'])
def get_calculation_methods():
    """الحصول على طرق حساب أوقات الصلاة المتاحة"""
    try:
        response = requests.get('http://api.aladhan.com/v1/methods')
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch calculation methods'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@prayer_times_bp.route('/qibla', methods=['GET'])
def get_qibla_direction():
    """الحصول على اتجاه القبلة"""
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    
    if not latitude or not longitude:
        return jsonify({'error': 'latitude and longitude are required'}), 400
    
    try:
        url = f'http://api.aladhan.com/v1/qibla/{latitude}/{longitude}'
        response = requests.get(url)
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to fetch qibla direction'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

