<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';  // vue-router에서 useRoute import
import axios from 'axios';

const route = useRoute();  // 현재 라우트 정보 가져오기
const boardIdx = route.params.boardIdx;  // URL 파라미터로 받은 idx 값
const board = ref(null);  // 게시글 정보를 저장할 변수

// 게시글 데이터를 불러오는 함수
onMounted(() => {
  fetchBoardDetail();
});

const fetchBoardDetail = async () => {
  try {
    const response = await axios.get(`/api/board/${boardIdx}`);  // idx 값을 기반으로 API 호출
    board.value = response.data;  // 게시글 정보 저장
  } catch (error) {
    console.error('게시글을 불러오는 데 실패했습니다:', error);
  }

};

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

  axios.post(`/api/comment/${boardIdx}`, postData)
  .then(response => {
      console.log('서버 응답:', response.data);
      fetchBoardDetail();    
    })
    .catch(error => {
      console.error('서버 오류:', error);
    });
};
</script>

<template>
  <div v-if="board">
    <h1>{{ board.title }}</h1>
    <p>작성자: {{ board.writer }}</p>
    <p>{{ board.content }}</p>
    <div>
      <h3>댓글</h3>
      <ul>
        <li v-for="comment in board.commentList" :key="comment.content">
          <strong>{{ comment.writer }}:</strong> {{ comment.content }}
        </li>
      </ul>
    </div>  
    <div>
    <h1>댓글 달기</h1>

    <input v-model="title" type="text" placeholder="제목을 입력하세요" />
    <textarea v-model="content" type="text" placeholder="내용을 입력하세요"></textarea>
    <input v-model="writer" type="name" name="name" placeholder="이름을 입력하세요" />
    <button @click="handleSubmit">작성</button>


  </div>

    
  </div>
</template>
