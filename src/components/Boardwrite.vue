<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';  
import axios from 'axios';

const router = useRouter();



const title = ref('');  
const content = ref('');  
const writer = ref('');  

const handleSubmit = () => {
  const postData = {
    title: title.value,
    content: content.value,
    writer: writer.value
  };
  console.log('전송할 데이터:', postData);

  axios.post('/api/board/register', postData)
  .then(response => {
      console.log('서버 응답:', response.data);
      router.push('/');
    })
    .catch(error => {
      console.error('서버 오류:', error);
    });
};
</script>


<template>
  <div>
    <h1>게시글 작성</h1>

    <input v-model="title" type="text" placeholder="제목을 입력하세요" />
    <textarea v-model="content" type="text" placeholder="내용을 입력하세요"></textarea>
    <input v-model="writer" type="name" name="name" placeholder="이름을 입력하세요" />
    <button @click="handleSubmit">작성</button>


  </div>
</template>

<style>
/* 스타일을 추가할 수 있습니다 */
input, textarea {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  max-width: 500px;
}

button {
  padding: 8px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>