import { defineStore } from 'pinia';
import axios from 'axios';

export const useBoardStore = defineStore('board', {
  state: () => {
    return {
      boardList: [],
      page: 0,  
      size: 3,  
      totalElements: 0,  
      totalPages: 0,  
      hasNext: false,  
      hasPrevious: false, 
    };
  },
  actions: {
    async getBoardList(page = this.page, size = this.size) {
      try {
        const response = await axios.get('/api/board/list', {
          params: {
            page: page,
            size: size,
          },
        });

        this.boardList = response.data.boardResDtoList;
        this.page = response.data.page;
        this.size = response.data.size;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.hasNext = response.data.hasNext;
        this.hasPrevious = response.data.hasPrevious;
      } catch (error) {
        console.error('게시판 목록을 가져오는 데 실패했습니다:', error);
      }
    },
  },
});
