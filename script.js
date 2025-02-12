 function toggleAdvantage() {
            let advantage = document.getElementById('advantage');
            let disadvantage = document.getElementById('disadvantage');
            if (advantage.checked) {
                disadvantage.checked = false;
            } else if (disadvantage.checked) {
                advantage.checked = false;
            }
        }
        function rollDice() {
            let advantage = document.getElementById('advantage').checked;
            let disadvantage = document.getElementById('disadvantage').checked;
            let successThreshold = 4;
            if (advantage) successThreshold = 3;
            if (disadvantage) successThreshold = 5;
            let numDice = parseInt(document.getElementById('numDice').value) || 1;
            let difficulty = parseInt(document.getElementById('difficulty').value) || 1;
            let initialRolls = [];
            let extraRolls = [];
            let finalDiceResults = [];
            let output = document.getElementById('output');
            output.innerHTML = "";

            for (let i = 0; i < numDice; i++) {
                let roll = Math.floor(Math.random() * 6) + 1;
                initialRolls.push(roll);
                finalDiceResults.push(roll);
            }

            let explosionCount = initialRolls.filter(die => die === 6).length;
            if (explosionCount > 0) {
                for (let i = 0; i < explosionCount; i++) {
                    let extraRoll = Math.floor(Math.random() * 6) + 1;
                    extraRolls.push(extraRoll);
                    finalDiceResults.push(extraRoll);
                }
            }

            finalDiceResults.sort((a, b) => b - a);
            let successCount = finalDiceResults.filter(die => die >= successThreshold).length;
            let failureCount = finalDiceResults.length - successCount;
            let countOnes = finalDiceResults.filter(die => die === 1).length;
            let countSixes = finalDiceResults.filter(die => die === 6).length;

            let resultText = `<p><strong>You rolled:</strong> ${initialRolls.join(", ")}</p>`;
            if (explosionCount > 0) {
                resultText += `<p class='italic'>Rolls of 6 explode! Rolling ${explosionCount} extra dice.</p>`;
                resultText += `<p><strong>Extra Rolls:</strong> ${extraRolls.join(", ")}</p>`;
            }
            resultText += `<div class='section-divider'></div>`;
            resultText += `<p><strong>Final Dice Pool:</strong> ${finalDiceResults.join(", ")}</p>`;
            resultText += `<p class='italic'>Successes: ${successCount}, Failures: ${failureCount}</p>`;
            resultText += `<div class='section-divider'></div>`;
            
            let successMessage = successCount >= difficulty ? "ACTION SUCCEEDED!" : "ACTION FAILED!";
            resultText += `<p style='color: ${successCount >= difficulty ? "green" : "red"}; font-weight: bold;'>${successMessage}</p>`;
            
            if (countSixes >= 3 && countOnes >= 3) {
                resultText += `<p style='font-weight: bold;'>Boons and Banes cancelled each other out! The action is a success.</p>`;
            } else if (countSixes >= 3) {
                resultText += `<p style='font-weight: bold;'>Action triggered a BOON!</p>`;
            } else if (countOnes >= 3) {
                resultText += `<p style='font-weight: bold;'>Action triggered a BANE!</p>`;
            }

            output.innerHTML = resultText;
            output.style.display = 'block';
        }
