document.getElementById('startQuiz').addEventListener('click', function() {
    document.getElementById('questionnaire').style.display = 'block';
});

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var scores = calculateScores();
    var hoarderType = determineHoarderType(scores);

    // Verbergen des Fragebogens und Anzeigen der Ergebnisse
    document.getElementById('questionnaire').style.display = 'none';
    redirectToResultPage(hoarderType);
});

function calculateScores() {
    var form = document.getElementById('quizForm');
    var scores = {
        'Sammlungsverhalten': 0,
        'Löschverhalten': 0,
        'PsychologischeFaktoren': 0,
        'AuswirkungenAufDenAlltag': 0,
        'Selbstwahrnehmung': 0
    };

    scores['Sammlungsverhalten'] = parseInt(form['question1'].value, 10) + parseInt(form['question2'].value, 10);
    scores['Löschverhalten'] = parseInt(form['question3'].value, 10) + parseInt(form['question4'].value, 10);
    scores['PsychologischeFaktoren'] = parseInt(form['question5'].value, 10) + parseInt(form['question6'].value, 10);
    scores['AuswirkungenAufDenAlltag'] = parseInt(form['question7'].value, 10) + parseInt(form['question8'].value, 10);
    scores['Selbstwahrnehmung'] = parseInt(form['question9'].value, 10);

    return scores;
}

function determineHoarderType(scores) {
    if (scores['Sammlungsverhalten'] > 6 && scores['PsychologischeFaktoren'] > 6) {
        return "AnxiousHoarder";
    } else if (scores['Löschverhalten'] > 6 && scores['PsychologischeFaktoren'] <= 6) {
        return "DisengagedHoarder";
    } else if (scores['Sammlungsverhalten'] > 6 && scores['Löschverhalten'] <= 6) {
        return "Collector";
    } else {
        return "CompliantHoarder";
    }
}

function redirectToResultPage(hoarderType) {
    document.querySelectorAll('.results').forEach(function(el) {
        el.style.display = 'none';
    });

    document.getElementById(hoarderType).style.display = 'block';
    document.querySelector('.ratgeber').style.display = 'block';
}