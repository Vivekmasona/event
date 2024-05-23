function showPopup() {
            document.getElementById('overlay').style.display = 'flex';
            document.getElementById('content').classList.add('blurred');
        }

        function hidePopup() {
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('content').classList.remove('blurred');
        }
