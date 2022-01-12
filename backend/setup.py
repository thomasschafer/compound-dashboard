from setuptools import setup, find_packages

setup(
    name='compounds_backend',
    version='1.0.0',
    packages=find_packages(include=['compounds_backend', 'compounds_backend.*'])
)