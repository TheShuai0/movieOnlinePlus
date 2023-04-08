var cookie = {
  namespaced: true,
  state: {
    token: '',
    nowTime: ''
  },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);     //存储token
    },
    delToken(state) {
      state.token = '';
      localStorage.removeItem('token');    //删除token
    },
    getToken(state) {
      state.token = '';
      localStorage.getItem('token');    //得到token
    },
    setNowTime(state, nowTime) {
      state.nowTime = nowTime;
      localStorage.setItem('nowTime', nowTime);     //存储token时间
    },
    delNowTime(state) {
      state.nowTime = '';
      localStorage.removeItem('nowTime');    //删除token时间
    }
}

