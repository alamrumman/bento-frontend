import { useEffect } from "react";
import { siteConfig } from "../config/siteConfig.js";
import "./legal.css";

const SECTIONS = [
  { id: "overview", title: "概要" },
  { id: "data", title: "収集する情報" },
  { id: "cookies", title: "クッキーと解析" },
  { id: "thirdparty", title: "第三者サービス" },
  { id: "retention", title: "保存期間" },
  { id: "rights", title: "お客様の権利" },
  { id: "contact", title: "お問い合わせ" },
];

export default function Privacy() {
  useEffect(() => {
    document.title = `プライバシーポリシー ― ${siteConfig.brand.name}`;
  }, []);

  return (
    <article className="legal">
      <div className="legal__container">
        <header className="legal__header">
          <span className="eyebrow">法務</span>
          <h1 className="legal__title">プライバシーポリシー</h1>
          <div className="legal__meta">
            <span>最終更新: {siteConfig.legal.lastUpdated}</span>
            <span>{siteConfig.legal.entityName}</span>
          </div>
        </header>

        <nav className="legal__toc" aria-label="目次">
          <h2>目次</h2>
          <ol>
            {SECTIONS.map((s) => (
              <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
            ))}
          </ol>
        </nav>

        <section id="overview">
          <h3>1. 概要</h3>
          <p>
            本プライバシーポリシーは、{siteConfig.legal.entityName}(以下「{siteConfig.brand.name}」、
            「当社」)が当ウェブサイトの訪問者に関する情報をどのように取り扱うかについて
            説明するものです。当サイトはECストア、アカウントシステム、ニュースレターを
            運営していないため、取り扱う情報の範囲は意図的に限定されています。
          </p>
        </section>

        <section id="data">
          <h3>2. 収集する情報</h3>
          <p>当サイトはお客様から直接の個人情報を収集しません。具体的には:</p>
          <ul>
            <li>アカウント作成、ログイン、パスワード保管はありません。</li>
            <li>ニュースレター登録フォームはありません。</li>
            <li>注文または決済フォームはありません。</li>
          </ul>
          <p>
            メールアドレス{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> を通じて
            ご連絡いただいた場合、お客様のメッセージ、メールアドレス、共有された情報を当社が
            受領します。
          </p>
        </section>

        <section id="cookies">
          <h3>3. クッキーと解析</h3>
          <p>
            当サイトは、マーケティングまたは広告目的のクッキーを設置しません。今後、匿名の
            ページビュー集計のためにプライバシーに配慮した軽量な解析ツールを導入する場合は、
            本ポリシーを更新し、使用するツールについて説明します。
          </p>
        </section>

        <section id="thirdparty">
          <h3>4. 第三者サービス</h3>
          <p>
            当社はタイポグラフィの表示に Google Fonts を読み込んでいます。Google Fonts の
            スタイルシートを読み込むことで <code>fonts.googleapis.com</code> および{" "}
            <code>fonts.gstatic.com</code> へのリクエストが発生します。当社側から個人を特定
            可能なアカウント情報がこのリクエストに含まれることはありません。
          </p>
        </section>

        <section id="retention">
          <h3>5. 保存期間</h3>
          <p>
            お客様から送信されたメールは、ご返信に必要な期間および合理的な期間、当社の標準的な
            受信箱に保管されます。下記の連絡先より、いつでも削除をご請求いただけます。
          </p>
        </section>

        <section id="rights">
          <h3>6. お客様の権利</h3>
          <p>
            お住まいの地域によっては、当社が保有する個人情報へのアクセス、訂正、削除、または
            処理への異議申し立てを行う権利を有する場合があります。これらの権利を行使するには、
            下記のメールアドレスまでご連絡ください。
          </p>
        </section>

        <section id="contact">
          <h3>7. お問い合わせ</h3>
          <p>
            本プライバシーポリシーに関するご質問、または個人情報の取り扱いに関するご質問は、
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> までお送り
            ください。
          </p>
        </section>

        <p className="legal__note">
          本ポリシーは、取引機能を持たない小規模な静的マーケティングサイト向けの平易な
          テンプレートです。お住まいの管轄区域における弁護士による法的レビューに代わる
          ものではありません。
        </p>
      </div>
    </article>
  );
}
