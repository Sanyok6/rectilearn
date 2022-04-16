"""Add public option for studyset

Revision ID: 33937d712c34
Revises: ed6bea0ca986
Create Date: 2022-04-16 16:23:05.467605

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '33937d712c34'
down_revision = 'ed6bea0ca986'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('study_sets', sa.Column('is_public', sa.Boolean(), nullable=True))
    op.create_unique_constraint(None, 'study_sets', ['id'])
    op.create_unique_constraint(None, 'studyset_questions', ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'studyset_questions', type_='unique')
    op.drop_constraint(None, 'study_sets', type_='unique')
    op.drop_column('study_sets', 'is_public')
    # ### end Alembic commands ###