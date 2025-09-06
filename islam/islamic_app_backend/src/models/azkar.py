from src.models.user import db

class Azkar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable=False)  # صباح، مساء، نوم، إلخ.
    text = db.Column(db.Text, nullable=False)
    count = db.Column(db.Integer, default=1)  # عدد مرات التكرار الموصى بها
    reference = db.Column(db.String(200))  # المرجع

    def __repr__(self):
        return f'<Azkar {self.category}: {self.text[:50]}...>'

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'text': self.text,
            'count': self.count,
            'reference': self.reference
        }

class CustomAzkar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)
    count = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    user = db.relationship('User', backref=db.backref('custom_azkar', lazy=True))

    def __repr__(self):
        return f'<CustomAzkar {self.user_id}: {self.text[:50]}...>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'text': self.text,
            'count': self.count,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

