import { useEffect } from "react";
import { siteConfig } from "../config/siteConfig.js";
import "./legal.css";

const SECTIONS = [
  { id: "acceptance", title: "規約への同意" },
  { id: "use", title: "サイトの利用" },
  { id: "ip", title: "知的財産" },
  { id: "thirdparty", title: "第三者リンク" },
  { id: "disclaimers", title: "免責事項" },
  { id: "liability", title: "責任の制限" },
  { id: "changes", title: "規約の変更" },
  { id: "contact", title: "お問い合わせ" },
];

export default function Terms() {
  useEffect(() => {
    document.title = `利用規約 ― ${siteConfig.brand.name}`;
  }, []);

  return (
    <article className="legal">
      <div className="legal__container">
        <header className="legal__header">
          <span className="eyebrow">法務</span>
          <h1 className="legal__title">利用規約</h1>
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

        <section id="acceptance">
          <h3>1. 規約への同意</h3>
          <p>
            {siteConfig.brand.name}のウェブサイトにアクセスし、または利用することにより、
            お客様は本利用規約に拘束されることに同意するものとします。同意いただけない
            場合は、当サイトのご利用をお控えください。
          </p>
        </section>

        <section id="use">
          <h3>2. サイトの利用</h3>
          <p>
            当サイトは、{siteConfig.brand.name}ブランドおよび当社の弁当製品に関する情報
            提供を目的としています。個人的かつ非商業的な目的で自由に閲覧いただけます。
            サイトの運営を妨げる行為、過度な頻度でのスクレイピング、適用法に違反する
            利用は禁止されています。
          </p>
        </section>

        <section id="ip">
          <h3>3. 知的財産</h3>
          <p>
            当サイトのすべてのコンテンツ ―{siteConfig.brand.name}の名称、商標、イラスト、
            コピー、デザインを含む ― は、{siteConfig.legal.entityName}またはそのライセンサーに
            帰属します。事前の書面による許可なく、これらのコンテンツを複製、配布、または
            派生物の作成を行うことはできません。
          </p>
        </section>

        <section id="thirdparty">
          <h3>4. 第三者リンク</h3>
          <p>
            当サイトは、第三者のウェブサイト(ソーシャルメディアやフォントプロバイダー等)
            にリンクする場合があります。当社はそれらのサイトを管理しておらず、コンテンツ、
            ポリシー、運用について責任を負いません。
          </p>
        </section>

        <section id="disclaimers">
          <h3>5. 免責事項</h3>
          <p>
            当サイトは「現状有姿」かつ「提供可能な範囲」で提供されます。商品性、特定目的
            への適合性、非侵害性を含む(ただしこれらに限らない)明示または黙示の一切の
            保証を行いません。
          </p>
        </section>

        <section id="liability">
          <h3>6. 責任の制限</h3>
          <p>
            適用法により認められる最大限の範囲において、{siteConfig.legal.entityName}は、
            お客様のサイト利用または利用不能に起因または関連して生じた間接的、付随的、
            特別的、結果的、懲罰的損害について、一切責任を負いません。
          </p>
        </section>

        <section id="changes">
          <h3>7. 規約の変更</h3>
          <p>
            当社は、本規約を随時更新することがあります。改訂版を公開した場合、上記の
            「最終更新」日付が変更されます。変更後も継続して当サイトをご利用いただくことは、
            更新された規約への同意とみなされます。
          </p>
        </section>

        <section id="contact">
          <h3>8. お問い合わせ</h3>
          <p>
            本規約に関するご質問は、
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> までお送り
            ください。
          </p>
        </section>

        <p className="legal__note">
          本規約は、取引機能を持たない小規模な静的マーケティングサイト向けの平易な
          テンプレートです。お住まいの管轄区域における弁護士による法的レビューに代わる
          ものではありません。
        </p>
      </div>
    </article>
  );
}
