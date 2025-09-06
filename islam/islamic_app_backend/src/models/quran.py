from src.models.user import db

class QuranText(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sura_id = db.Column(db.Integer, nullable=False)
    aya_id = db.Column(db.Integer, nullable=False)
    text = db.Column(db.Text, nullable=False)
    juz = db.Column(db.Integer)
    page = db.Column(db.Integer)

    def __repr__(self):
        return f'<QuranText Sura {self.sura_id}, Aya {self.aya_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'sura_id': self.sura_id,
            'aya_id': self.aya_id,
            'text': self.text,
            'juz': self.juz,
            'page': self.page
        }

class QuranTafseer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sura_id = db.Column(db.Integer, nullable=False)
    aya_id = db.Column(db.Integer, nullable=False)
    tafseer_text = db.Column(db.Text, nullable=False)
    tafseer_name = db.Column(db.String(100), nullable=False)  # اسم التفسير

    def __repr__(self):
        return f'<QuranTafseer {self.tafseer_name} - Sura {self.sura_id}, Aya {self.aya_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'sura_id': self.sura_id,
            'aya_id': self.aya_id,
            'tafseer_text': self.tafseer_text,
            'tafseer_name': self.tafseer_name
        }

class QuranAudio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sura_id = db.Column(db.Integer, nullable=False)
    reciter_id = db.Column(db.String(100), nullable=False)
    file_path = db.Column(db.String(500))  # مسار الملف المحلي (للتخزين المؤقت)
    download_date = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<QuranAudio Reciter {self.reciter_id} - Sura {self.sura_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'sura_id': self.sura_id,
            'reciter_id': self.reciter_id,
            'file_path': self.file_path,
            'download_date': self.download_date.isoformat() if self.download_date else None
        }

class UserBookmarks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    sura_id = db.Column(db.Integer, nullable=False)
    aya_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    user = db.relationship('User', backref=db.backref('bookmarks', lazy=True))

    def __repr__(self):
        return f'<UserBookmarks User {self.user_id} - Sura {self.sura_id}, Aya {self.aya_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'sura_id': self.sura_id,
            'aya_id': self.aya_id,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

