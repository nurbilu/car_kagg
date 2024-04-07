import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns 
import plotly.express as px  # Corrected import statement
import klib
import pickle
import statsmodels.api as sm
from sklearn.impute import KNNImputer 
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Lasso, LinearRegression, Ridge
from sklearn.neighbors import KNeighborsRegressor
from sklearn.svm import SVR
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score, accuracy_score
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cars_df = pd.read_csv('car_prices.csv', on_bad_lines='warn')

@app.route('/search', methods=['GET'])
def search():
    make_name = request.args.get('make')
    if not make_name:
        return jsonify({'error': 'Please provide a car make name'}), 400
    filtered_data = cars_df[cars_df['make'].str.lower() == make_name.lower()]
    if filtered_data.empty:
        return jsonify({'message': 'No data found for the specified make'}), 404  
    
    result = filtered_data.to_json(orient='records')
    return result



@app.route('/makes', methods=['GET'])
def makes():
    all_makes = cars_df['make'].unique().tolist()
    return jsonify({'makes': all_makes})



if __name__ == '__main__':
    app.run(debug=True)
