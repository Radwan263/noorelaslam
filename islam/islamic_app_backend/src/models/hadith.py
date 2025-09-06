from src.models.user import db

class Hadith(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book = db.Column(db.String(100), nullable=False)  # صحيح البخاري، صحيح مسلم، إلخ.
    chapter = db.Column(db.String(200))
    text = db.Column(db.Text, nullable=False)
    explanation = db.Column(db.Text)  # شرح الحديث (اختياري)
    reference = db.Column(db.String(200))

    def __repr__(self):
        return f'<Hadith {self.book}: {self.text[:50]}...>'

    def to_dict(self):
        return {
            'id': self.id,
            'book': self.book,
            'chapter': self.chapter,
            'text': self.text,
            'explanation': self.explanation,
            'reference': self.reference
        }

