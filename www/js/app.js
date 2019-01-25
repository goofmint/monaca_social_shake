document.addEventListener('DOMContentLoaded', async () => {
  // NCMBの初期化
  const applicationKey = 'YOUR_APPLICATION_KEY';
  const clientKey = 'YOUR_CLIENT_KEY';
  const ncmb = new NCMB(applicationKey, clientKey);
  // ログインユーザを取得
  const user = ncmb.User.getCurrentUser();
  if (!user) {
    // ログインしていなかったら匿名認証実行
    const user = await ncmb.User.loginAsAnonymous();
    // ACLを設定（自分のデータを誰でも読み込み可能にする）
    const acl = new ncmb.Acl;
    acl
      .setPublicReadAccess(true)
      .setUserWriteAccess(user, true)
    await user.set('acl', acl).update()
  }
  window.ncmb = ncmb;
});
