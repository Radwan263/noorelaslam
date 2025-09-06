from src.models.user import db

class SadaqaJariya(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    person_name = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # المستخدم الذي أضاف الاسم
    supplication_count = db.Column(db.Integer, default=0)  # عدد الدعوات
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    last_supplicated_at = db.Column(db.DateTime)

    user = db.relationship('User', backref=db.backref('sadaqa_jariya', lazy=True))

    def __repr__(self):
        return f'<SadaqaJariya {self.person_name}: {self.supplication_count} supplications>'

    def to_dict(self):
        return {
            'id': self.id,
            'person_name': self.person_name,
            'user_id': self.user_id,
            'supplication_count': self.supplication_count,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_supplicated_at': self.last_supplicated_at.isoformat() if self.last_supplicated_at else None
        }

