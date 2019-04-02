from django.db import models
from django.utils import timezone
from .question import Question
from .user import User
from .editor import Editor

class Answer(models.Model):
    # FKs
    question = models.ForeignKey(
        'Question',
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
    )
    editor = models.ForeignKey(
        'Editor',
        on_delete=models.CASCADE,
    )
    # Required
    description = models.CharField(max_length=255, blank=False, null=False)
    # Optional
    repository_url = models.CharField(max_length=255, blank=True, null=True)
    # Flags
    has_comments = models.BooleanField(
        default=False, blank=True, null=False)
    is_edited = models.BooleanField(
        default=False, blank=True, null=False)
    is_deleted = models.BooleanField(
        default=False, blank=True, null=False)
    # Timestmaps
    created_at = models.DateTimeField(
        default=timezone.now, blank=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=False)
    deleted_at = models.DateTimeField(blank=True, null=True)