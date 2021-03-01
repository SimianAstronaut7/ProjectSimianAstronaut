# Reads in reports found on https://www.sec.gov/data/foiadocsfailsdatahtm Concatenates them into one huge DataFrame, applies
# some basic calculation, serializes it for storage. 


import pandas as pd
from io import StringIO
import datetime as dt
import json


#Disable scientific notation, allow 2 decimal place, add commas to float display
pd.options.display.float_format = '{:,.2f}'.format

def deserialize():
    df = pd.read_json('data.json', orient="split")

    print(df)

def create_dataframe(file_path):
    f = open(file_path, 'r') #

    # It takes the headers and makes them the first row. No idea why. Skip row 0.  
    df = pd.read_csv(StringIO(f.read()), header=None, sep='|', skiprows=[0],
                    names=['SETTLEMENT_DATE', 'CUSIP', 'SYMBOL', 'QUANTITY (FAILS)', 'DESCRIPTION', 'PRICE'])

    size_before_conversion = df.size
    df['SETTLEMENT_DATE'] = pd.to_datetime(df['SETTLEMENT_DATE'], format='%Y%m%d', errors='coerce')
    # Check what rows had issues (where NaNs) with: df[df.isna().any(axis=1)]
    df = df.dropna(subset=['SETTLEMENT_DATE'])

    df['QUANTITY (FAILS)'] = pd.to_numeric(df['QUANTITY (FAILS)'], errors='coerce')
    df = df.dropna(subset=['QUANTITY (FAILS)'])

    df['PRICE'] = pd.to_numeric(df['PRICE'], errors='coerce')
    # Most of our errors seem to come from the price
    df = df.dropna(subset=['PRICE'])

    size_after_conversion = df.size

    #These files seem to have a fair amount of errors (say quite a few "." for Price just checking manually.) Let's get a sense how much.
    invalid_data_rows = size_before_conversion - size_after_conversion

    print("total invalid rows " + str(invalid_data_rows))
    df['DollarValue'] = df['QUANTITY (FAILS)'] * df['PRICE']

    daily_dollars_of_failures = df.groupby('SETTLEMENT_DATE')['DollarValue'].sum()
    daily_dollars_of_failures = daily_dollars_of_failures.to_frame()
    daily_dollars_of_failures = daily_dollars_of_failures.rename(columns={"DollarValue": "PercentageOfDailyVolume"})

    df = df.set_index('SETTLEMENT_DATE').join(daily_dollars_of_failures)

    df["PercentageOfDailyVolume"] = (df['DollarValue']/df["PercentageOfDailyVolume"]) * 100

    return df

def serialize(df, file_path):
    result = df.to_json(orient="split")
    parsed = json.loads(result)

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(parsed, f, ensure_ascii=False) #, indent=4


def read_in_and_serialize(arr):

    dfs = []
    for f in arr:
        dfs.append(create_dataframe(f))
    
    combined = pd.concat(dfs)

    serialize(combined, 'data.json')
    
# deserialize()
read_in_and_serialize([
    'Utils/cnsfails202012b.txt',
    'Utils/cnsfails202101a.txt',
    'Utils/cnsfails202101b.txt'])