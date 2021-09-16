$(function () {
  const imgbg = $(".phone-dialog .bg").attr("data-src");
  $(".phone-dialog .bg").attr("src", imgbg);
  $(
    ".action-try, .action-try-1, .action-try-2, .action-try-3, .action-try-4"
  ).on("click", function () {
    alert(111);
  });
});
