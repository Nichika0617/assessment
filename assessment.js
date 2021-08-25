(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
     * 指定した要素の子要素を全て削除する
     * @param{HTMLElement} element HTMLの要素
     */
    function removeAllChildren(element){
        while (element.firstChild){ // 子要素がある限り削除
            element.removeChild(element.firstChild);
        }
    }
    userNameInput.onkeydown =(event) =>{
        if (event.keyCode === 13){
            assessmentButton.onclick();
        }
    };
    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) { // 名前が空の時は処理を終了する。
            return;
        }

        // 診断結果エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        //TODO　ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D&text="
        + encodeURIComponent(result);
        anchor.setAttribute('href', hrefValue);
        anchor.className ='twiter-hashtag-button';
        anchor.innerText = 'あなたのいいところをツイートする' ;
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    };

    const answers = [
        '{userName}さんの良いところは声です。{userName}さんの特徴的な声は皆を引き付けるような声で、とても心に残ります。',
        '{userName}さんの良いところはまなざしです。{userName}さんに見つめられた人は気になって仕方がないでしょう。',
        '{userName}さんの良いところは情熱です。{userName}さんの情熱に周りの人は感化され、頑張る気持ちになれています。',
        '{userName}さんの良いところは厳しさです。{userName}さんの優しく、厳しい性格は大きな物事を成功に導くでしょう。',
        '{userName}さんの良いところは多くの知識を持っているところです。博識な{userName}さんは多くの人に頼りにされています。',
        '{userName}さんの良いところはユニークなところです。{userName}さんだけの特徴が皆を楽しい気持ちにします。',
        '{userName}さんの良いところは用心深さです。{userName}さんの洞察に多くの人が助けられています。',
        '{userName}さんの良いところは見た目です。内側から溢れる{userName}さんのよさに皆が気を引かれます。',
        '{userName}さんの良いところは決断力です。{userName}さんのする決断に多くの人が助けられています。',
        '{userName}さんの良いところは思いやりです。{userName}さんに気をかけてもらった多くの人が感謝しています。',
        '{userName}さんの良いところは感受性です。{userName}さんが感じたことに皆が共感し、分かり合う事が出来るでしょう。',
        '{userName}さんの良いところは節度です。強引すぎない{userName}さんの考えに皆が感心しているでしょう。',
        '{userName}さんの良いところは好奇心です。新しいことに向かっていく{userName}さんの前向きな気持ちは多くの人の目に魅力的に映るでしょう。',
        '{userName}さんの良いところは気配りが出来るところです。{userName}さんの配慮が多くの人を助けるでしょう。',
        '{userName}さんの良いところは自制心です。ダメだと思ったときにしっかりと衝動を抑えられる{userName}さんは皆から評価されています。',
        '{userName}さんの良いところはその全てです。ありのままの{userName}さん自身が{userName}さんの良いところなのです。\n(大当たり！！これが表示される確率は6.25%です。おめでとう！！)'
    ];

    /**
    * 名前の文字列を渡すと診断結果を返す関数
    * @param{string} userName ユーザーの名前
    * @return{string} 診断結果
    */
    function assessment(userName) {
        //全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i += 1) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        //文字のコード番号の合計を回答の数で割って添字の数値を求める。
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        result = result.replace(/{userName}/g,userName);
        return result;
    }

    

    //テストコード
    console.log(assessment('太朗'))
    console.log(assessment('太朗'))
    console.assert(
        assessment('太郎') === '太朗さんの良いところはまなざしです。太朗さんに見つめられた人はあなたの事が気になって仕方がないでしょう',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
        console.assert(
            assessment('太郎') === assessment('太郎'),
            '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
        );
})();
