import pandas as pd
import plotly.express as px
from sqlalchemy import create_engine
import pymysql
import sqlalchemy
from sqlalchemy import types
import matplotlib.pyplot as plt
import seaborn as sns
plt.rc("font",family = "Malgun Gothic")
plt.rcParams["axes.unicode_minus"] = False
from flask import jsonify
from datetime import datetime,date


# db 접속
def dbconnection():
    # 접속정보
    host = "35.87.206.219"
    user = "nomore"
    password = "nnoo1122"
    db = "nomore"
    charset = "utf8"
    #조회시 컬럼명을 동시에 보여줄지 여부 설정
    cursorclass = pymysql.cursors.DictCursor
    autocommit = True
    # DB접속하기
    try:
        conn = pymysql.connect(host=host,
                               user = user,
                               password = password,
                               db=db,
                               charset=charset,
                               autocommit=autocommit,
                               cursorclass = cursorclass)
        print("DB접속 성공>>>",conn)
    except:
        print("DB Server Checking...")
    cur = conn.cursor()
    return cur,conn

# db에서 sql 구문을 통해 데이터 조회 및 데이터프레임에 저장
def sql_select(cur,sql):
    rs_cnt= cur.execute(sql)
    rows = cur.fetchall()
    print(rs_cnt,"건이 조회되었습니다")
    df = pd.DataFrame(rows)
    return df

# db 커서와 접속정보 반납
def db_close(cur,conn):
    try:
        cur.close()
        conn.close()
    except:
        print("이미 모든 커서와 접속정보가 반납되었습니다")

# 가격대 컬럼 생성
def price_level(df):
    price_level = [
            str(int(i) // 100000) + "0만원~" + str(int(i) // 100000 + 1) + "0만원"
            if category == "전기밥솥"
            else str(int(i) // 500000 *5) + "0만원~" + str(int(i) // 500000 *5 + 5) + "0만원"
            for i, category in zip(df["prod_prc"], df["prod_ctgr_name"])]

    price_level = [price_level.replace("00만원~50","0~50") for price_level in price_level]
    price_level = [price_level.replace("00만원~10","0~10") for price_level in price_level]
    df["price_level"] = price_level
    

# 연령대 컬럼 생성
# def age_level(df):
#     age_list = []
#     # 날짜만 가져오기
#     current_datetime = datetime.now()
#     current_date = current_datetime.date()
#     for i in df["user_birth"]:
#         if isinstance(i, date):  # 이미 datetime.date 타입인 경우
#             birth_date = i
#         else:
#             birth_date = datetime.strptime(i, "%Y-%m-%d").date()
#         age = (current_date - birth_date).days // 365
#         age_list.append(age)
#         age_level = [str(i//10) + "0대" for i in age_list]
#     df["age_level"] = age_level

    # 연령대 컬럼 생성
def age_level(df):
    age_list = []
    # 날짜만 가져오기
    current_datetime = datetime.now()
    current_date = current_datetime.date()
    for i in df["user_birth"]:
        if isinstance(i, date):  # 이미 datetime.date 타입인 경우
            birth_date = i
        elif isinstance(i, str):  # 문자열인 경우에만 처리
            birth_date = datetime.strptime(i, "%Y-%m-%d").date()
        else:
            # 그 외의 경우에는 처리하지 않거나 예외 처리를 수행
            # 예를 들어, None 또는 다른 타입인 경우에 대한 처리 추가 가능
            birth_date = None  # 혹은 다른 기본값으로 설정

        if birth_date:  # birth_date가 None이 아닌 경우에만 계산
            age = (current_date - birth_date).days // 365
            age_list.append(age)
        else:
            age_list.append(None)  # 예외 처리 등을 위해 None을 추가
    age_level = [str(age // 10) + "0대" if age is not None else None for age in age_list]
    df["age_level"] = age_level
    

# 그룹화 두개 df 생성
def df_group2(df,col1,col2):
    df_group = df.groupby([col1,col2],as_index=False).count()
    return df_group

# 그룹화 세개 df 생성
def df_group3(df,col1,col2,col3):
    df_group = df.groupby([col1,col2,col3],as_index=False).count()
    return df_group

# 그룹화 두개 plot 생성
def group2_plot(df,col1,col2,col3,choice1):
    condition = df[col1] == choice1
    values = df[condition][col3]
    labels = df[condition][col2]
    # 최대 5개와 나머지 합계를 기타로 만들기
    values_sorted = values.sort_values(ascending=False)
    top_5=values_sorted[:5].index
    labels = [labels[i] for i in top_5]
    labels.append("기타")
    values_to_plot = [values[i] for i in top_5]
    values_to_plot.append(values_sorted[5:].sum())
    # DataFrame 생성
    # chart_data_df = pd.DataFrame({'labels': labels, 'values': values_to_plot})
    chartData = {'labels' : labels,
                'datasets':[{
                    'data' : values_to_plot,
                    'backgroundColor' :['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
                    }],}
    return chartData

# 그룹화 세개 plot 생성
def group3_plot(df,col1,col2,col3,col4,choice1,choice2):
    condition = (df[col2] == choice2) & (df[col1] == choice1)
    # 값(개수) 가져오기 - 기준:prod_id/prod_name
    values = df[condition][col4]
    # 실제 그래프에서 범주로 쓰일 것
    labels = df[condition][col3]
    # 최대 5개와 나머지 합계를 기타로 만들기
    values_sorted = values.sort_values(ascending=False)
    top_5=values_sorted[:5].index
    labels = [labels[i] for i in top_5]
    labels.append("기타")
    values_to_plot = [values[i] for i in top_5]
    values_to_plot.append(values_sorted[5:].sum())
    chartData = {'labels' : labels,
                'datasets':[{
                    'data' : values_to_plot,
                    'backgroundColor' :['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
                    }],}
    return chartData

# JSON 변환시 int64, int32를 int로 변환
def convert_int_columns(df):
    for column in df.columns:
        if df[column].dtype == 'int64' or df[column].dtype == 'int32':
            df[column] = df[column].astype(int)
    return df
# DataFrame을 JSON으로 변환하는 함수
def dataframe_to_json(df):
    return df.to_json(orient='records')

