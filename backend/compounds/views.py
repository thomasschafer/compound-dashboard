from rest_framework import serializers, viewsets

from .models import AssayResult, Compound


class AssayResultSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AssayResult
        fields = [
            'compound_id',
            'result_id',
            'target',
            'result',
            'operator',
            'value',
            'unit',
        ]

class CompoundSerializer(serializers.HyperlinkedModelSerializer):
    assay_results_details = serializers.SerializerMethodField()

    def get_assay_results_details(self, obj):
        return [
            AssayResultSerializer(assay_result).data
            for assay_result in  obj.assayresult_set.all()
        ]


    class Meta:
        model = Compound
        fields = [
            'compound_id',
            'smiles',
            'molecular_weight',
            'ALogP',
            'molecular_formula',
            'num_rings',
            'image',
            'assay_results_details',
        ]

class CompoundViewSet(viewsets.ModelViewSet):
    queryset = Compound.objects.all()
    serializer_class = CompoundSerializer
