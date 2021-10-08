<template>
<v-app>
    <v-container fill-height style="max-width:550px">
                <v-layout align-center row wrap>
                <div id="b1">
                <v-flex xs12>
                    <v-card>
                        <v-toolbar flat height="30">
                            <v-toolbar-title>REST API-GET/POST/PUT/DELETE</v-toolbar-title>
                        </v-toolbar>
                        <div class="pa-3">
                        <v-text-field v-model="id" label="아이디"> </v-text-field>
                        <v-text-field v-model="name" label="이름"> </v-text-field>
                        <v-text-field v-model="age" label="나이"> </v-text-field>
                    <v-btn class="pink white--text" @click="allUser">회원리스트</v-btn>
                    <v-btn class="yellow darken-2--text" @click="selectUser">회원 조회</v-btn>
                    <v-btn class="blue lighten-2--text" @click="insertUser">회원 추가</v-btn>
                    <v-btn class="amber lighten-1--text" @click="updateUser">회원 수정</v-btn>
                    <v-btn class="green lighten-2--text" @click="deleteUser">회원 삭제</v-btn>
                    </div>
                </v-card>    
                <div>
                  <v-simple-table>
                    <thead>
                        <tr>
                            <th class="text-left"> id</th>
                            <th class="text-left"> name </th>
                            <th class="text-left"> age </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.id }}
                            <td>{{ user.name }}</td>
                            <td>{{ user.age }}</td>
                        </tr>
                    </tbody>
                  </v-simple-table>
                </div>
                </v-flex>
                </div>
            </v-layout>
         </v-container>
</v-app>        
</template>

<script>
import axios from 'axios'

  export default {
      data(){
          return {
              users:[],
              name:'',
              age:'',
              id:'',
            }
      },
      methods:{
          insertUser(){
              axios.post('http://localhost:8088/api/user',null,{
                   params:{
                       id:this.id,
                       name:this.name,
                       age:this.age },
                       headers:{'content-type': 'application/json'}
                   }).then(res=>{
                     this.users = response.data
                     console.log(res)
                     alert("회원이 추가되었습니다.");
              }).catch(err=>{
                  console.log(err);
              })
          },
           allUser(){
              axios.get('http://localhost:8088/api/user')
              .then(res =>{
                  console.log(res.data)
                  this.users = res.data
              })
              .catch(error =>{
                  console.log("에러"+error);
              });
          },
          selectUser(){
              axios.get(`http://localhost:8088/api/user/+${this.id}`,{
                  params:{
                      id:this.id
                  }
              })
              .then(res =>{
                  console.log(res.data)
                  
              })
              .catch(error =>{
                  console.log("에러"+error);
              });
          },
           updateUser(){
              axios.put(`http://localhost:8088/api/user/+${this.id}`,null,{
                  params:{
                      name:this.name,
                      age:this.age
                  }
              })
              .then(res =>{
                  console.log(res.data)
                  alert("회원 수정 완료!")
              })
              .catch(error =>{
                  console.log("에러"+error);
              });
          },
          deleteUser(){
              axios.delete(`http://localhost:8088/api/user/+${this.id}`)
              .then(res =>{
                  console.log(res.data)
                  alert("회원 삭제 성공!")
              })
              .catch(error =>{
                  console.log("에러"+error);
              });
          },
      },
      created(){
          this.allUser()
      },
  }
</script>