# from flask import render_template
# from app import app
# from function_module import dbconnection,sql_select,db_close,price_level,age_level,df_group2,df_group3,group2_plot,group3_plot,convert_int_columns,dataframe_to_json
# from flask import request
# from flask import jsonify
# from flask_cors import CORS
# import json
# # flask에서 제공하는 전역객체(global object) : 한 요청 내에서 여러 함수 간에 데이터를 공유하는데 사용됨
# from flask import g


# @app.route('/api/test',methods=['GET','POST'])
# def test():
#     if request.method == 'POST':
#         # 여기에 POST 요청을 처리하는 코드 추가
#         # request.json을 통해 클라이언트에서 전송한 데이터에 접근할 수 있음
#         data = request.json
#         # g 객체에 데이터 저장
#         g.data = data
#         print(data)

#         # 예시: 클라이언트에 응답으로 데이터를 다시 전송
#         return jsonify(data)

#     else:
#         #GET 요청에 대한 코드
#         # get 요청에서 쿼리 파라미터로 데이터 받기
#         ctgr_name = g.data["prod_ctgr_name"]

#         cur,conn = dbconnection()
#         sql = "SELECT prod_id, buy_id,prod_name,prod_company,prod_ctcd,prod_ctgr_name, prod_prc,user_id, user_gender,user_birth,user_address,user_family_counts   FROM buy_dtls JOIN prod JOIN buy JOIN user JOIN prod_ctgr   WHERE buy_pd_nm = prod_id   AND buy_id = buy_dtls_nm    AND buy_mbr_id = user_id    AND prod_ctcd = prod_ctgr_code"
#         df = sql_select(cur,sql)
#         db_close(cur,conn)
#         price_level(df)
#         age_level(df)
#         df_group = df_group2(df,"prod_ctgr_name","price_level")
#         df_cic = convert_int_columns(df_group)
#         chartData = group2_plot(df_cic,"prod_ctgr_name","price_level","prod_id",ctgr_name)
#         # plot_div = chart.to_html(full_html=False)
#         # return render_template('test.html',DataFrame=df_group)
#         # json_chart_data = json.dumps(chartData)
#         # 딕셔너리로 변환 후 JSON 변환
#         json_chart_data = json.dumps(chartData, ensure_ascii=False, default=str)
#         return json_chart_data


from flask import render_template
from app import app
from function_module import dbconnection,sql_select,db_close,price_level,age_level,df_group2,df_group3,group2_plot,group3_plot,convert_int_columns,dataframe_to_json
from flask import request
from flask import jsonify
from flask_cors import CORS
import json
# flask에서 제공하는 전역객체(global object) : 한 요청 내에서 여러 함수 간에 데이터를 공유하는데 사용됨
from flask import g


@app.route('/api-flask/chart',methods=['GET','POST'])
def test():
    if request.method == 'POST':
        # 여기에 POST 요청을 처리하는 코드 추가
        # request.json을 통해 클라이언트에서 전송한 데이터에 접근할 수 있음
        data = request.json
        print(data)

        cur,conn = dbconnection()
        sql = "SELECT prod_id, buy_id,prod_name,prod_company,prod_ctcd,prod_ctgr_name, prod_prc,user_id, user_gender,user_birth,user_address,user_family_counts   FROM buy_dtls JOIN prod JOIN buy JOIN user JOIN prod_ctgr   WHERE buy_pd_nm = prod_id   AND buy_id = buy_dtls_nm    AND buy_mbr_id = user_id    AND prod_ctcd = prod_ctgr_code"
        df = sql_select(cur,sql)
        db_close(cur,conn)
        price_level(df)
        age_level(df)
        df_g1 = df_group2(df,data["Data1"]["col1"],data["Data1"]["col2"])
        df_cic1 = convert_int_columns(df_g1)
        chartData1 = group2_plot(df_cic1,data["Data1"]["col1"],data["Data1"]["col2"],data["Data1"]["col3"], data["Data1"]["choice"])
        # 딕셔너리로 변환 후 JSON 변환
        json_chart_data1 = json.dumps(chartData1, ensure_ascii=False, default=str)
        df_g2 = df_group3(df,data["Data2"]["col1"],data["Data2"]["col2"],data["Data2"]["col3"])
        df_cic2 = convert_int_columns(df_g2)
        chartData2 = group3_plot(df_cic2,data["Data2"]["col1"],data["Data2"]["col2"],data["Data2"]["col3"], data["Data2"]["col4"],data["Data2"]["choice1"],data["Data2"]["choice2"])
        # 딕셔너리로 변환 후 JSON 변환
        json_chart_data2 = json.dumps(chartData2, ensure_ascii=False, default=str)
        return jsonify({'chartData1': json_chart_data1 ,'chartData2': json_chart_data2 })

        

    else:
        #GET 요청에 대한 코드
        # GET 요청 처리
        prod_ctgr_name = request.args.get('prod_ctgr_name')
        

        
        return jsonify({'message': 'GET request successful', 'prod_ctgr_name': prod_ctgr_name})
