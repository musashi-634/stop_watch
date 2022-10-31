/*global $*/
// JSLintにグローバル変数$を使用することを宣言

$(document).ready(function(){
  
  // 画面に表示された時間を取得する関数
  function getDisplayTime($hour, $minute, $second, $underSecond) {
    return {
      hour: Number($hour.text()),
      minute: Number($minute.text()),
      second: Number($second.text()),
      underSecond: Number($underSecond.text())
    };
  }
  
  // 時間を進める関数
  function addTime(timeDictionary, $hour, $minute, $second, $underSecond) {
    timeDictionary.underSecond ++;
    if (timeDictionary.underSecond === 10) {  // secondへの繰り上がりの処理
      timeDictionary.underSecond = 0;
      timeDictionary.second ++;
      if (timeDictionary.second === 60) {  // minuteへの繰り上がりの処理
        timeDictionary.second = 0;
        timeDictionary.minute ++;
        if (timeDictionary.minute === 60) {  // hourへの繰り上がりの処理
        timeDictionary.minute = 0;
        timeDictionary.hour ++;
        }
      }
    }
    
    $underSecond.text(timeDictionary.underSecond);
    $second.text(timeDictionary.second);
    $minute.text(timeDictionary.minute);
    $hour.text(timeDictionary.hour);
  }
  
  // 時間をゼロに戻す関数
  function resetTime($hour, $minute, $second, $underSecond, funcGetDisplayTime) {
    $hour.add($minute)
      .add($second)
      .add($underSecond)
      .text("0");
    return funcGetDisplayTime($hour, $minute, $second, $underSecond);
  }
  
  // --------------------------------------------------------------------------
  // main
  // --------------------------------------------------------------------------
  const $start = $("#start");
  const $stop = $("#stop");
  const $reset = $("#reset");
  const $hour = $("#hour");
  const $minute = $("#minute");
  const $second = $("#second");
  const $underSecond = $("#under-second");
  let timeDictionary = getDisplayTime($hour, $minute, $second, $underSecond);
  let timerId = null;
  
  $start.click(function() {
    timerId = setInterval(function() {
      addTime(timeDictionary, $hour, $minute, $second, $underSecond);}, 100);  // コールバック関数に引数を渡すために無名関数を使用
    $(this).prop("disabled", true);
    $stop.add($reset).prop("disabled", false);
  });
  
  $stop.click(function() {
    clearInterval(timerId);
    $(this).prop("disabled", true);
    $start.prop("disabled", false);
  });
  
  $reset.click(function() {
    clearInterval(timerId);
    timeDictionary = resetTime(
      $hour, $minute, $second, $underSecond, getDisplayTime);
    $(this).add($stop).prop("disabled", true);
    $start.prop("disabled", false);
  });
});