import io
import json

from django.db import migrations


def load_compounds_data(apps, schema_editor):
    Compound = apps.get_model("compounds", "Compound")
    AssayResult = apps.get_model("compounds", "AssayResult")
    db_alias = schema_editor.connection.alias

    PATH_TO_COMPOUNDS_JSON = "../data/compounds.json"
    with io.open(PATH_TO_COMPOUNDS_JSON, 'r', encoding='utf-8-sig') as compounds_file:
        compounds_json = json.load(compounds_file)
        for compound_data in compounds_json:
            assay_data_array = compound_data.pop("assay_results")
            compound = Compound.objects.using(db_alias).create(**compound_data)
            for assay_data in assay_data_array:
                AssayResult.objects.using(db_alias).create(**assay_data, compound=compound)


class Migration(migrations.Migration):

    dependencies = [
        ('compounds', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(load_compounds_data),
    ]
