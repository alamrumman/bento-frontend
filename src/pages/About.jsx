import { useEffect } from "react";
import { siteConfig } from "../config/siteConfig.js";
import "./about.css";

export default function About() {
  useEffect(() => {
    document.title = `マルについて ― ${siteConfig.brand.name}`;
  }, []);

  return (
    <>
      <section className="section about-hero">
        <div className="container about-hero__grid">
          <div>
            <span className="eyebrow">マルについて</span>
            <h1 className="display about-title">
              私たちは、規律を売っています。<br />夕食として包んで。
            </h1>
            <p className="lede about-lede">
              {siteConfig.brand.name}は、強い意見を持つ小さな厨房です。食事は、境界線とともに
              出されるとき、より誠実になる ― そう私たちは考えています。仕切りは、装飾ではあり
              ません。食べ物を整える、制約です。
            </p>
          </div>
          <aside className="about-card">
            <span className="eyebrow">ひと目で</span>
            <dl>
              <div><dt>創業</dt><dd>東京、2024年</dd></div>
              <div><dt>厨房</dt><dd>設計上、ひとつ</dd></div>
              <div><dt>一日の生産</dt><dd>約180食</dd></div>
              <div><dt>回収トレイ</dt><dd>はい ― すべての注文</dd></div>
            </dl>
            <a className="btn btn-ghost" href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
          </aside>
        </div>
      </section>

      <section className="section section--inset">
        <div className="container about-prose">
          <span className="eyebrow">私たちの物語</span>
          <h2 className="h2">意図ある、ひとつの箱。</h2>
          <div className="prose">
            <p>
              {siteConfig.brand.name}は、個人的なロジスティクスの問題から始まりました。
              働く一週間分の、おいしくて、バランスがとれていて、その場で交渉する余地のない
              食事。一番シンプルな答えは、一番規律のあるものでした ―
              食事を決めるのは厨房であり、昼食の場ではない、と。
            </p>
            <p>
              最初の試作は、黒いトレイ、三つの仕切り、三つの規律でした。汁が流れない
              たんぱく質。ふやけない主食。昼食後の眠気を覚ますだけの酸味を持つ野菜。
              以来、献立は変えてきました。規律は、変えていません。
            </p>
            <p>
              腕を組んだ、CEO兼創業者の写真はありません。あるのは、小さな厨房と、
              配送のループと、メールの受信箱 ― <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}</a> ― だけです。
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">私たちの約束</span>
            <h2 className="h2">一度だけ組み立て、設計通りに提供する。</h2>
          </div>
          <ul className="promise-list">
            <li>
              <span className="promise-list__n">01</span>
              <div>
                <h3 className="h3">盛り付けの前に、分量を。</h3>
                <p>すべての要素は、トレイに触れる前に計量され、名付けられます。</p>
              </div>
            </li>
            <li>
              <span className="promise-list__n">02</span>
              <div>
                <h3 className="h3">詰め物は、なし。</h3>
                <p>自分の仕切りに値しない食材は、箱に入れません。</p>
              </div>
            </li>
            <li>
              <span className="promise-list__n">03</span>
              <div>
                <h3 className="h3">トレイは、戻ってくる。</h3>
                <p>回収可能、洗える、漆塗りのトレイ ― 次回の配送時に回収します。</p>
              </div>
            </li>
            <li>
              <span className="promise-list__n">04</span>
              <div>
                <h3 className="h3">一日、一献立。</h3>
                <p>ひとつの厨房、ひとつの献立、丁寧に。40品もある、雑多なメニューはありません。</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
