from django.db import models

class Compound(models.Model):
    compound_id = models.IntegerField(primary_key=True)
    smiles = models.CharField(max_length=200)
    molecular_weight = models.FloatField()
    ALogP = models.FloatField()
    molecular_formula = models.CharField(max_length=100)
    num_rings = models.IntegerField()
    image = models.CharField(max_length=100)

class AssayResult(models.Model):
    IC50 = "IC50"
    KI = "KI"
    KD = "KD"
    RESULT_CHOICES = (
        (IC50, "IC50"),
        (KI, "Ki"),
        (KD, "Kd"),
    )

    EQUAL = "EQ"
    GREATER_THAN = "GT"
    GREATER_THAN_OR_EQUAL = "GE"
    LESS_THAN = "LT"
    LESS_THAN_OR_EQUAL = "LE"
    APPROX_EQUAL = "AE"
    STAR = "*"
    OPERATOR_CHOICES = (
        (EQUAL, "="),
        (GREATER_THAN, ">"),
        (GREATER_THAN_OR_EQUAL, ">="),
        (LESS_THAN, "<"),
        (LESS_THAN_OR_EQUAL, "<="),
        (APPROX_EQUAL, "~"),
        (STAR, "*"),
    )

    compound = models.ForeignKey(Compound, on_delete=models.CASCADE)
    result_id = models.IntegerField(primary_key=True)
    target = models.CharField(max_length=300)
    result = models.CharField(max_length=30, choices=RESULT_CHOICES)
    operator = models.CharField(max_length=2, choices=OPERATOR_CHOICES)
    value = models.IntegerField()
    unit = models.CharField(max_length=20)
