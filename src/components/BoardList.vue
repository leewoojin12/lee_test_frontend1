<script setup>
import { useBoardStore } from '@/stores/useboardStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';  // vue-router import 추가

const boardStore = useBoardStore();
const router = useRouter();  // router 인스턴스 생성

// Fetch board list when the component mounts
onMounted(() => {
  boardStore.getBoardList(0, 3);  // Fetch page 0 with 3 items per page
});

// Navigate to the next page
const loadNextPage = () => {
  if (boardStore.hasNext) {
    boardStore.getBoardList(boardStore.page + 1, 3);
  }
};

// Navigate to the previous page
const loadPreviousPage = () => {
  if (boardStore.hasPrevious) {
    boardStore.getBoardList(boardStore.page - 1, 3);
  }
};

// 게시글 클릭 시 상세 페이지로 이동
const goToBoardDetail = (idx) => {
  router.push(`/board/${idx}`);  // idx를 URL 파라미터로 전달하여 상세 페이지로 이동
};
</script>

<template>
  <div>
    <h1>게시판 목록</h1>
    <ul>
      <li v-for="board in boardStore.boardList" :key="board.idx" @click="goToBoardDetail(board.idx)">
        {{ board.idx }} - <strong>{{ board.title }}</strong> - {{ board.writer }} - {{ board.commentCount }}
      </li>
    </ul>
    
    <div>
      <button @click="loadPreviousPage" :disabled="!boardStore.hasPrevious">이전 페이지</button>
      <span>Page {{ boardStore.page + 1 }} / {{ boardStore.totalPages }}</span>
      <button @click="loadNextPage" :disabled="!boardStore.hasNext">다음 페이지</button>
    </div>
  </div>

  <button @click="router.push('/board/register')">글쓰기</button>
</template>
