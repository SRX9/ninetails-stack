export default `
#loaderMain {
  position: absolute;
  z-index: 500;
  background-color: #000000;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: bottom, left, top, right;
  background-repeat: repeat, repeat;
}

#loaderMain img{
  	animation: beat .5s infinite alternate;
}

@keyframes beat{
	to { transform: scale(1.4); }
}

@keyframes topFadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}


`;
