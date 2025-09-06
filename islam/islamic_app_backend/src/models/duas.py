from src.models.user import db

class Duas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable=False)  # أدعية من القرآن، أدعية للمناسبات، إلخ.
    text = db.Column(db.Text, nullable=False)
    reference = db.Column(db.String(200))

    def __repr__(self):
        return f'<Duas {self.category}: {self.text[:50]}...>'

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'text': self.text,
            'reference': self.reference
        }

class CustomDuas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    user = db.relationship('User', backref=db.backref('custom_duas', lazy=True))

    def __repr__(self):
        return f'<CustomDuas {self.user_id}: {self.text[:50]}...>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'text': self.text,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

