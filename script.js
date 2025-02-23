document.addEventListener('DOMContentLoaded', () => {
    const button1P = document.querySelector('.player-button-1p');
    const button2P = document.querySelector('.player-button-2p');
    const reconsiderButton = document.querySelector('.reconsider-button');
    const bufferOverlay = document.querySelector('.buffer-overlay');
    const dialogueOverlay = document.querySelector('.dialogue-overlay');
    const typingText = document.getElementById('typing-text');
    let reconsiderClicked = false;

    // Improved Typing Effect Function
    function startTypingEffect(text, callback) {
        let index = 0;
        typingText.innerHTML = ''; // Clear the text area

        // Create a cursor element
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        typingText.appendChild(cursor);

        // Format the text with proper spacing after commas
        const formattedText = text.replace(/,(?! )/g, ', ');
        const lines = formattedText.split('\\n');

        function typeCharacter() {
            if (index < formattedText.length) {
                const currentChar = formattedText[index];
                
                if (currentChar === '\\' && formattedText[index + 1] === 'n') {
                    // Handle line break
                    typingText.insertBefore(document.createElement('br'), cursor);
                    index += 2; // Skip both '\' and 'n' characters
                } else {
                    // Insert regular text
                    const textNode = document.createTextNode(currentChar);
                    typingText.insertBefore(textNode, cursor);
                    index++;
                }
                setTimeout(typeCharacter, 120);
            } else {
                cursor.remove(); // Remove the cursor when done
                if (callback) callback();
            }
        }
        typeCharacter();
    }

    // Button event listeners remain the same
    if (button1P) {
        button1P.addEventListener('click', () => {
            document.body.style.backgroundColor = 'black';
            document.body.style.backgroundImage = 'none';

            document.querySelectorAll('.content, .clouds').forEach(element => {
                element.style.opacity = '0';
                setTimeout(() => element.style.display = 'none', 1000);
            });

            setTimeout(() => {
                document.querySelector('.sad-message').style.display = 'block';
            }, 1200);
        });
    }

    if (reconsiderButton) {
        reconsiderButton.addEventListener('click', () => {
            if (reconsiderClicked) return;
            reconsiderClicked = true;

            reconsiderButton.classList.add('clicked');
            bufferOverlay.style.display = 'flex';

            setTimeout(() => {
                bufferOverlay.style.display = 'none';
                dialogueOverlay.style.display = 'flex';
                document.querySelector('.dialogue-box').style.display = 'block';

                typingText.innerHTML = '';

                // Updated text with proper formatting
                startTypingEffect(
                    "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.\n— Jeremiah 29:11\n\nNo choice :>",
                    () => {
                        setTimeout(() => {
                            dialogueOverlay.style.display = 'none';
                            openPopup();
                        }, 2000);
                    }
                );
            }, 5000);
        });
    }

    if (button2P) {
        button2P.addEventListener('click', openPopup);
    }

    function openPopup() {
        let popup = window.open('pop.html', '_blank', 'width=400,height=320');
        if (!popup || popup.closed || typeof popup.closed === "undefined") {
            setTimeout(() => {
                window.location.href = 'pop.html';
            }, 1000);
        }
    }
});


// Handle Messages from Popup
window.addEventListener("message", (event) => {
    if (event.data.action === "changeBackground") {
        // Step 1: Fade out all elements smoothly
        document.querySelectorAll(".clouds, .content, .sad-message").forEach(element => {
            element.style.transition = "opacity 1s ease-in-out";
            element.style.opacity = "0";
            setTimeout(() => element.style.display = "none", 1000);
        });

        // Step 2: Fade in black screen first
        let blackout = document.createElement("div");
        blackout.style.position = "fixed";
        blackout.style.top = "0";
        blackout.style.left = "0";
        blackout.style.width = "100vw";
        blackout.style.height = "100vh";
        blackout.style.background = "black";
        blackout.style.zIndex = "999";
        blackout.style.opacity = "0";
        blackout.style.transition = "opacity 1s ease-in-out";
        document.body.appendChild(blackout);
        setTimeout(() => (blackout.style.opacity = "1"), 100);

        // Step 3: Show final.gif with fade-in after black screen
        setTimeout(() => {
            let finalContainer = document.createElement("div");
            finalContainer.style.position = "fixed";
            finalContainer.style.top = "0";
            finalContainer.style.left = "0";
            finalContainer.style.width = "100vw";
            finalContainer.style.height = "100vh";
            finalContainer.style.background = "url('assets/final.gif') no-repeat center center fixed";
            finalContainer.style.backgroundSize = "cover";
            finalContainer.style.opacity = "0";
            finalContainer.style.transition = "opacity 1s ease-in-out";
            finalContainer.style.zIndex = "1000";
            document.body.appendChild(finalContainer);

            // Step 4: Add Black Translucent Overlay
            let overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100vw";
            overlay.style.height = "100vh";
            overlay.style.background = "rgba(0, 0, 0, 0.5)";
            overlay.style.zIndex = "1001";
            document.body.appendChild(overlay);

            setTimeout(() => {
                finalContainer.style.opacity = "1"; // Fade in final.gif
                // Show the message container (Lez Go text and Join button) with proper vertical alignment
                showMessageContainer();
            }, 100);

            // Step 5: Generate Falling Stars
            generateFallingStars();
        }, 1000);
    }
});

// Function to create falling star effect
function generateFallingStars() {
    setInterval(() => {
        createStar();
    }, 200);
}

function createStar() {
    let star = document.createElement("img");
    let size = 60;
    Object.assign(star.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        top: "-80px",
        left: Math.random() * window.innerWidth + "px",
        opacity: "1",
        zIndex: "1000",
        pointerEvents: "none"
    });
    star.src = "assets/star.gif";
    document.body.appendChild(star);

    let duration = 4000 + Math.random() * 3000;
    star.animate([
        { transform: `translateY(0px)`, opacity: 1 },
        { transform: `translateY(${window.innerHeight}px)`, opacity: 0 }
    ], { duration, easing: "linear", iterations: 1 });
    setTimeout(() => star.remove(), duration);
}

// Function to show the message container (Lez Go text and Join button)
function showMessageContainer() {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
        messageContainer.style.display = 'flex';
        messageContainer.style.flexDirection = 'column';
    }
}