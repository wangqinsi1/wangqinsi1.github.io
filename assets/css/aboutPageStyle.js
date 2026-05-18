document.addEventListener('DOMContentLoaded', (event) => {
  // 交互显示功能
  document.querySelectorAll('.newPaper').forEach(newPaper => {
    newPaper.addEventListener('mouseenter', () => {
      newPaper.querySelector('.staticImage').style.display = 'none';
      newPaper.querySelector('.animatedGif').style.display = 'block';
    });
    newPaper.addEventListener('mouseleave', () => {
      newPaper.querySelector('.staticImage').style.display = 'block';
      newPaper.querySelector('.animatedGif').style.display = 'none';
    });
  });

	document.querySelectorAll('.cite-btn').forEach(button => {
	  button.addEventListener('click', function(event) {
		event.preventDefault(); // 阻止链接默认行为
		const citationText = this.getAttribute('data-citation').replace(/<br>/g, '\n'); // 将 <br> 替换为换行符
		navigator.clipboard.writeText(citationText).then(() => {
		  // 显示复制成功消息
		  const confirmation = document.getElementById('copy-confirmation');
		  confirmation.style.display = 'block';
		  setTimeout(() => { confirmation.style.display = 'none'; }, 2000); // 2秒后隐藏消息
		}).catch(err => {
		  console.error('Error copying text: ', err);
		});
	  });
	});

	


  // 悬浮窗显示功能 (only wire up if the wechat modal exists)
  const wechatModal = document.getElementById("wechat-modal");
  if (wechatModal) {
    const wechatButton = document.querySelector(".list a[href='#wetchat']");
    const closeBtn = wechatModal.querySelector(".close");

    if (wechatButton) {
      wechatButton.addEventListener('click', () => {
        wechatModal.style.display = "block";
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        wechatModal.style.display = "none";
      });
    }

    window.addEventListener('click', e => {
      if (e.target === wechatModal) {
        wechatModal.style.display = "none";
      }
    });
  }

	// gallery — JS-driven auto-scroll with click-to-speed-up controls
	const galleryTrack = document.getElementById("image-track");
	const galleryWrapper = document.querySelector(".gallery-wrapper");

	if (galleryTrack && galleryWrapper) {
	  // Clone images once so the marquee can wrap seamlessly
	  Array.from(galleryTrack.querySelectorAll('.image')).forEach(img => {
	    const clone = img.cloneNode(true);
	    clone.setAttribute('aria-hidden', 'true');
	    galleryTrack.appendChild(clone);
	  });

	  const SLOW_SPEED = -40;  // px/sec, default leftward drift (negative = left)
	  const FAST_SPEED = 320;  // px/sec while mouse button is held

	  let trackHalfWidth = 0;
	  let position = 0;
	  let speed = SLOW_SPEED;  // positive = rightward, negative = leftward
	  let isHolding = false;
	  let pointerSide = 1;     // -1 left half, +1 right half
	  let initialized = false;

	  const measure = () => {
	    const half = galleryTrack.scrollWidth / 2;
	    if (half > 0) {
	      trackHalfWidth = half;
	      if (!initialized) {
	        position = -trackHalfWidth;
	        initialized = true;
	      }
	    }
	  };
	  measure();
	  window.addEventListener('load', measure);
	  window.addEventListener('resize', measure);

	  let lastTime = performance.now();
	  const tick = (now) => {
	    const dt = Math.min((now - lastTime) / 1000, 0.05);
	    lastTime = now;
	    if (trackHalfWidth > 0) {
	      position += speed * dt;
	      while (position > 0) position -= trackHalfWidth;
	      while (position < -trackHalfWidth) position += trackHalfWidth;
	      galleryTrack.style.transform = `translateX(${position}px)`;
	    }
	    requestAnimationFrame(tick);
	  };
	  requestAnimationFrame((now) => { lastTime = now; tick(now); });

	  const updateSide = (clientX) => {
	    const rect = galleryWrapper.getBoundingClientRect();
	    pointerSide = (clientX - rect.left) < rect.width / 2 ? -1 : 1;
	    galleryWrapper.classList.toggle('hover-left', pointerSide === -1);
	    galleryWrapper.classList.toggle('hover-right', pointerSide === 1);
	  };

	  galleryWrapper.addEventListener('mousemove', (e) => {
	    updateSide(e.clientX);
	    if (isHolding) speed = pointerSide * FAST_SPEED;
	  });

	  galleryWrapper.addEventListener('mousedown', (e) => {
	    isHolding = true;
	    updateSide(e.clientX);
	    speed = pointerSide * FAST_SPEED;
	  });

	  const endHold = () => {
	    if (!isHolding) return;
	    isHolding = false;
	    speed = SLOW_SPEED;
	  };
	  galleryWrapper.addEventListener('mouseup', endHold);
	  galleryWrapper.addEventListener('mouseleave', () => {
	    endHold();
	    galleryWrapper.classList.remove('hover-left', 'hover-right');
	  });

	  galleryWrapper.addEventListener('touchstart', (e) => {
	    isHolding = true;
	    updateSide(e.touches[0].clientX);
	    speed = pointerSide * FAST_SPEED;
	  }, { passive: true });
	  galleryWrapper.addEventListener('touchend', endHold);
	  galleryWrapper.addEventListener('touchcancel', endHold);
	}
	
	// for email
	document.getElementById('emailLink').addEventListener('click', function(event) {
	  event.preventDefault();
	  const email = 'hi.jinghan@gmail.com';

	  navigator.clipboard.writeText(email)
		.then(() => {
		  console.log('Email copied to clipboard');
		  const copiedSpan = document.getElementById('copied');
		  copiedSpan.style.display = 'inline';
		  setTimeout(() => {
			copiedSpan.style.display = 'none';
		  }, 2000);
		})
		.catch((error) => {
		  console.error('Failed to copy email: ', error);
		});
	});
	
	
});


