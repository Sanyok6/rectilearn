"""Make username non unique

Revision ID: b7f136365e25
Revises: 40a8c7777d5b
Create Date: 2022-04-17 17:44:57.805863

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b7f136365e25'
down_revision = '40a8c7777d5b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('users_name_key', 'users', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('users_name_key', 'users', ['name'])
    # ### end Alembic commands ###
