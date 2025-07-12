 const toggleBtn   = document.getElementById('chat-toggle');
    const popup       = document.getElementById('chat-popup');
    const closeBtn    = document.getElementById('chat-close');
    const form        = document.getElementById('chat-form');
    const input       = document.getElementById('chat-input');
    const messagesBox = document.getElementById('chat-messages');

    function toggleChat(){
      const open = popup.classList.toggle('open');
      popup.setAttribute('aria-hidden',(!open).toString());
      if(open){
        input.focus();
      }
    }
    function addMessage(text,who='bot'){
      const div=document.createElement('div');
      div.className='message '+who;
      div.textContent=text;
      messagesBox.appendChild(div);
      messagesBox.scrollTop=messagesBox.scrollHeight;
    }

    toggleBtn.addEventListener('click',toggleChat);
    closeBtn.addEventListener('click',toggleChat);

    form.addEventListener('submit',e=>{
      e.preventDefault();
      const text=input.value.trim();
      if(!text)return;
      addMessage(text,'you');
      input.value='';
      setTimeout(()=>addMessage('Received: '+text,'bot'),400);
    });

    setTimeout(()=>addMessage('नमस्ते! How can I help you today?','bot'),1000);