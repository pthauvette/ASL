import svgPaths from "./svg-xevomu9hph";
import imgImg from "figma:asset/570243f23da77d6a1ac7b15077f8a3eaba1fc3ec.png";
import imgImg1 from "figma:asset/410c340aa057242400c608368f918307cdd72438.png";
import imgImg2 from "figma:asset/1d5ad8aaf12fd61a75197f707f6ef40c7edd6e1f.png";
import imgImg3 from "figma:asset/bec21fc75386a86210d32bec8ca98fcb2380d21e.png";
import imgImg4 from "figma:asset/382cb0e384baa64e73f058ab42b836d40983c4f4.png";
import imgImg5 from "figma:asset/9223fea86145e6dfbb549fa5928c67909467f2cd.png";
import imgImg6 from "figma:asset/01b744838454c6116265a9cad1508e071ab33771.png";
import imgImg7 from "figma:asset/c92c7f2328b345106c14a5fa435dd017c4af9f8c.png";
import imgImg8 from "figma:asset/9fb4a6e1053e905ce9ea6f07407f88df6ff41652.png";
import imgImg9 from "figma:asset/7fddb0fa231bcf8173fc8f5cefa9238927f45a3e.png";
import imgImg10 from "figma:asset/17dce852e7706a209d9e005f3e680b0d7635c2f5.png";
import imgImg11 from "figma:asset/b78d96077ca34f268b76ab0867289e57a1f5444a.png";
import imgImg12 from "figma:asset/767bbaca3d9ea2d5b6d15214584ef251906aeb78.png";
import imgImg13 from "figma:asset/7e7eb144f8dafa6aedf68d7568c72c0167501bbe.png";
import imgImg14 from "figma:asset/96d3a5a3d5ae393695c5900b87832ffbc94aed96.png";
import imgImg15 from "figma:asset/775c6b23f8192911e00982ed3e2fe52e1b269024.png";
import imgImg16 from "figma:asset/c19e09b34768e8b7f4a78306b56d02b9fa5bdd6f.png";
import imgImg17 from "figma:asset/c7dfdc218a4c7531465868b7e6b3bb2402d3b6e8.png";
import imgImg18 from "figma:asset/e5b568c924ce1f3eccd749df3feea96aaedec6dd.png";

function Div() {
  return (
    <div
      className="absolute bg-[rgba(30,58,138,0.5)] h-[800px] left-0 top-0 w-[1440px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Img() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-[800px] left-0 top-0 w-[1440px]"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[800px] left-0 top-0 w-[1440px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div />
      <Img />
    </div>
  );
}

function Img1() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat left-0 rounded-[9999px] size-20 top-0"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg1}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#ffffff] border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Img2() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat left-16 rounded-[9999px] size-20 top-0"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg2}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#ffffff] border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Img3() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat left-32 rounded-[9999px] size-20 top-0"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg3}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#ffffff] border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Div2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-20 left-[410.44px] top-[-36px] w-52"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Img1 />
      <Img2 />
      <Img3 />
    </div>
  );
}

function Div3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-24 left-0 top-0 w-[1152px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Playfair_Display:Regular',_sans-serif] font-normal h-32 leading-[0] left-0 text-[#ffffff] text-[96px] text-left top-[-59.52px] w-[369px]">
        <p className="block leading-[96px]">La Force</p>
      </div>
      <Div2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p18af0c00}
            fill="var(--fill-0, #1E3A8A)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0 w-3.5"
      data-name="svg"
    >
      <Frame />
    </div>
  );
}

function I() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[167.36px] top-5 w-3.5"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg />
    </div>
  );
}

function Button() {
  return (
    <div
      className="absolute bg-[#ffffff] h-14 left-0 rounded-[9999px] top-0 w-[213.359px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-5 leading-[0] left-24 not-italic text-[16px] text-blue-900 text-center top-[16.7px] translate-x-[-50%] w-32">
        <p className="block leading-[normal]">Devenir membre</p>
      </div>
      <I />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-4 relative shrink-0 w-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 16"
      >
        <g id="Frame">
          <path d="M12 16H0V0H12V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p29731900}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[18px] overflow-clip p-0 top-4 w-3"
      data-name="Frame"
    >
      <Frame1 />
    </div>
  );
}

function Span() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[29.64px] rounded-[9999px] size-12 top-0"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <Frame2 />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[229.36px] top-1 w-[248.406px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Span />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-5 leading-[0] left-[184.14px] not-italic text-[#ffffff] text-[16px] text-center top-[12.7px] translate-x-[-50%] w-[189px]">
        <p className="block leading-[normal]">Découvrir les Armateurs</p>
      </div>
    </div>
  );
}

function Div4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-0 top-[332px] w-[1152px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button />
      <Button1 />
    </div>
  );
}

function Div5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[452px] left-8 top-[277px] w-[1152px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div3 />
      <div className="absolute font-['Playfair_Display:Regular',_sans-serif] font-normal h-32 leading-[0] left-0 text-[#ffffff] text-[96px] text-left top-8 w-[967px]">
        <p className="block leading-[96px]">du transport maritime</p>
      </div>
      <div className="absolute font-['Playfair_Display:Regular',_sans-serif] font-normal h-20 leading-[0] left-0 text-[60px] text-gray-100 text-left top-[146px] w-[828px]">
        <p className="block leading-[60px]">sur le Saint-Laurent et au-delà</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-14 leading-[0] left-0 not-italic text-[18px] text-gray-200 text-left top-[226px] w-[896px]">
        <p className="block leading-[28px]">
          Soutenir la croissance de nos membres et le transport maritime sur le
          Fleuve Saint-Laurent en assurant la représentation et la promotion des
          priorités des Armateurs canadiens.
        </p>
      </div>
      <Div4 />
    </div>
  );
}

function Div6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[800px] left-20 top-0 w-[1360px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div5 />
    </div>
  );
}

function Div7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-[7px] w-[330.766px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-[30px] not-italic text-[#ffffff] text-[24px] text-left top-[-4px] w-[293px]">
        <p className="block leading-[32px]">Armateurs Saint-Laurent</p>
      </div>
      <div
        className="absolute inset-[0.88%_101.9%_33.5%_-13.47%]"
        data-name="Vector"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 39 21"
        >
          <path
            d={svgPaths.p3d807000}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </div>
      <div
        className="absolute inset-[4%_99.97%_33.5%_-3.19%]"
        data-name="Vector"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 11 20"
        >
          <path
            d={svgPaths.p31e6aa00}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </div>
      <div
        className="absolute inset-[-8.5%_109.29%_67.88%_-13.47%]"
        data-name="Vector"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14 13"
        >
          <path
            d={svgPaths.p33541480}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </div>
      <div
        className="absolute inset-[-8.5%_107.68%_80.38%_-9.61%]"
        data-name="Vector"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 7 9"
        >
          <path
            d={svgPaths.p34b29d80}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[409.94px] top-[11px] w-[569.656px]"
      data-name="nav"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[#ffffff] text-[16px] text-left top-[-0.88px] w-[98px]">
        <p className="block leading-[24px]">{`L'Association`}</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[130.81px] not-italic text-[#ffffff] text-[16px] text-left top-[-0.88px] w-[126px]">
        <p className="block leading-[24px]">Le Saint-Laurent</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[287.81px] not-italic text-[#ffffff] text-[16px] text-left top-[-0.88px] w-[66px]">
        <p className="block leading-[24px]">Dossiers</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[385.52px] not-italic text-[#ffffff] text-[16px] text-left top-[-1.84px] w-[93px]">
        <p className="block leading-[24px]">Événements</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[510.25px] not-italic text-[#ffffff] text-[16px] text-left top-[-0.88px] w-[61px]">
        <p className="block leading-[24px]">Contact</p>
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[46px] left-[56.23px] rounded-[9999px] top-0 w-[165.234px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[25px] not-italic text-[#ffffff] text-[16px] text-left top-[11.8px] w-[116px]">
        <p className="block leading-[normal]">Portail Membre</p>
      </div>
    </div>
  );
}

function Div8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[46px] left-[1058.77px] top-0 w-[221.234px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Span1 />
    </div>
  );
}

function Div9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[46px] left-20 top-8 w-[1280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div7 />
      <Nav />
      <Div8 />
    </div>
  );
}

function Header() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[110px] left-0 top-0 w-[1440px]"
      data-name="header"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div9 />
    </div>
  );
}

function Section() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[800px] left-0 top-0 w-[1440px]"
      data-name="section"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div1 />
      <Div6 />
      <Header />
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-6 relative shrink-0 w-[27px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 27 24"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_532)">
            <path
              d={svgPaths.p35e6fb80}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_532">
            <path d="M0 0H27V24H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-6 items-center justify-center left-0 overflow-clip p-0 top-1 w-[27px]"
      data-name="Frame"
    >
      <Frame3 />
    </div>
  );
}

function Div10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[3.69px] top-0 w-[245.609px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame4 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-[29px] leading-[0] left-[141px] not-italic text-[24px] text-center text-gray-700 top-[-1.47px] translate-x-[-50%] w-[212px]">
        <p className="block leading-[normal]">Transport Canada</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="h-6 relative shrink-0 w-[27px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 27 24"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_513)">
            <path
              d={svgPaths.p7931200}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_513">
            <path d="M0 0H27V24H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-6 items-center justify-center left-0 overflow-clip p-0 top-1 w-[27px]"
      data-name="Frame"
    >
      <Frame5 />
    </div>
  );
}

function Div11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[313.3px] top-0 w-[535.844px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame6 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-[29px] leading-[0] left-[286.5px] not-italic text-[24px] text-center text-gray-700 top-[-1.61px] translate-x-[-50%] w-[503px]">
        <p className="block leading-[normal]">
          Corporation de Gestion de la Voie Maritime
        </p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-6 relative shrink-0 w-[27px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 27 24"
      >
        <g id="Frame">
          <path d="M27 24H0V0H27V24Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p826cf00}
            fill="var(--fill-0, #374151)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-6 items-center justify-center left-0 overflow-clip p-0 top-1 w-[27px]"
      data-name="Frame"
    >
      <Frame7 />
    </div>
  );
}

function Div12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[913.14px] top-0 w-[299.172px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame8 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-[29px] leading-[0] left-[168.5px] not-italic text-[24px] text-center text-gray-700 top-[-1.61px] translate-x-[-50%] w-[267px]">
        <p className="block leading-[normal]">Ports du Saint-Laurent</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0 size-6" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_523)">
            <path
              d={svgPaths.p1c33180}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_523">
            <path d="M0 0H24V24H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-6 top-1"
      data-name="Frame"
    >
      <Frame9 />
    </div>
  );
}

function Div13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[163.27px] top-24 w-[413.484px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame10 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-[29px] leading-[0] left-[223.5px] not-italic text-[24px] text-center text-gray-700 top-[-1.75px] translate-x-[-50%] w-[383px]">
        <p className="block leading-[normal]">Association Maritime du Québec</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-6 relative shrink-0 w-[18px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 24"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_520)">
            <path
              d={svgPaths.p16072e80}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_520">
            <path d="M0 0H18V24H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-6 items-center justify-center left-0 overflow-clip p-0 top-1 w-[18px]"
      data-name="Frame"
    >
      <Frame11 />
    </div>
  );
}

function Div14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[640.75px] top-24 w-[411.969px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame12 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-[29px] leading-[0] left-[219.5px] not-italic text-[24px] text-center text-gray-700 top-[-1.61px] translate-x-[-50%] w-[387px]">
        <p className="block leading-[normal]">Chambre de Commerce Maritime</p>
      </div>
    </div>
  );
}

function Div15() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-32 left-8 top-14 w-[1216px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div10 />
      <Div11 />
      <Div12 />
      <Div13 />
      <Div14 />
    </div>
  );
}

function Div16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[184px] left-20 top-[842px] w-[1280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[632px] not-italic text-[16px] text-center text-gray-600 top-[-1px] translate-x-[-50%] w-[560px]">
        <p className="block leading-[24px]">
          Partenaires officiels des Armateurs du Saint-Laurent
        </p>
      </div>
      <Div15 />
    </div>
  );
}

function Div17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[-0.6px] top-0 w-[2683.89px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[-0.6px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[271px]">
        <p className="block leading-[28px]">• 3 700 km de voies navigables</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[301.54px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[453px]">
        <p className="block leading-[28px]">
          • 40+ millions de tonnes transportées annuellement
        </p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[783.58px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[282px]">
        <p className="block leading-[28px]">
          • 15 écluses sur la Voie Maritime
        </p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[1095.48px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[309px]">
        <p className="block leading-[28px]">
          • 225 mètres de longueur maximale
        </p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[1436.19px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[261px]">
        <p className="block leading-[28px]">• Navigation 8 mois par année</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[1728.78px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-1.2px] w-[332px]">
        <p className="block leading-[28px]">{`• 2,5 milliards $ d'activité économique`}</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[2093.67px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[243px]">
        <p className="block leading-[28px]">• 200+ navires en opération</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[2367.82px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[315px]">
        <p className="block leading-[28px]">
          • 13 000 emplois directs et indirects
        </p>
      </div>
    </div>
  );
}

function Div18() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[2710.49px] top-0 w-[2683.89px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[-0.6px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[271px]">
        <p className="block leading-[28px]">• 3 700 km de voies navigables</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[301.54px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[453px]">
        <p className="block leading-[28px]">
          • 40+ millions de tonnes transportées annuellement
        </p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[783.58px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[282px]">
        <p className="block leading-[28px]">
          • 15 écluses sur la Voie Maritime
        </p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[1096.08px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[309px]">
        <p className="block leading-[28px]">
          • 225 mètres de longueur maximale
        </p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[1436.2px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[261px]">
        <p className="block leading-[28px]">• Navigation 8 mois par année</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[1728.78px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-1.2px] w-[332px]">
        <p className="block leading-[28px]">{`• 2,5 milliards $ d'activité économique`}</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[2093.67px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[243px]">
        <p className="block leading-[28px]">• 200+ navires en opération</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[2367.82px] not-italic text-[#1a1a1a] text-[18px] text-left top-[-0.92px] w-[315px]">
        <p className="block leading-[28px]">
          • 13 000 emplois directs et indirects
        </p>
      </div>
    </div>
  );
}

function Div19() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[-51px] top-8 w-[1440px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div17 />
      <Div18 />
    </div>
  );
}

function Div20() {
  return (
    <div
      className="absolute bg-gray-100 h-[92px] left-0 top-[1085px] w-[1440px]"
      data-name="div"
    >
      <div className="h-[92px] overflow-clip relative w-[1440px]">
        <Div19 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Hr() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-px left-0 top-[92px] w-24"
      data-name="hr"
    >
      <div
        aria-hidden="true"
        className="absolute border-[1px_0px_0px] border-gray-400 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div21() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[333px] left-8 top-0 w-[576px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Playfair_Display:Regular',_sans-serif] font-normal h-16 leading-[0] left-0 text-[#1a1a1a] text-[48px] text-left top-[-14.16px] w-[251px]">
        <p className="block leading-[60px]">Depuis 1936</p>
      </div>
      <Hr />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[120px] leading-[0] left-0 not-italic text-[16px] text-gray-600 text-left top-[127.4px] w-[573px]">
        <p className="block leading-[24px]">{`Acteur incontournable du transport maritime depuis 1936, ASL est une association représentant 12 propriétaires et opérateurs de navires domestiques, qui transportent des marchandises et des passagers sur les eaux du Saint-Laurent, mais également sur les Grands Lacs, dans l'Arctique et dans les provinces maritimes.`}</p>
      </div>
    </div>
  );
}

function Span2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-8 top-4 w-[165px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-5 leading-[0] left-[82.5px] not-italic text-[#ffffff] text-[16px] text-center top-px translate-x-[-50%] w-[165px]">
        <p className="block leading-[normal]">L’organisation</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p18af0c00}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0 w-3.5"
      data-name="svg"
    >
      <Frame13 />
    </div>
  );
}

function I1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[206px] top-5 w-3.5"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg1 />
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-[#000000] h-14 left-8 rounded-[9999px] top-[305px] w-[243px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <Span2 />
      <I1 />
    </div>
  );
}

function Span3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-8 top-4 w-[165px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-5 leading-[0] left-[82.5px] not-italic text-[#ffffff] text-[16px] text-center top-px translate-x-[-50%] w-[165px]">
        <p className="block leading-[normal]">L’équipe</p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p18af0c00}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0 w-3.5"
      data-name="svg"
    >
      <Frame14 />
    </div>
  );
}

function I2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[206px] top-5 w-3.5"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg2 />
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute bg-[#000000] h-14 left-[283px] rounded-[9999px] top-[305px] w-[243px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <Span3 />
      <I2 />
    </div>
  );
}

function Img4() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-[500px] left-0 top-0 w-[576px]"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg4}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div22() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[500px] left-[672px] rounded-2xl top-0 w-[576px]"
      data-name="div"
    >
      <div className="h-[500px] overflow-clip relative w-[576px]">
        <Img4 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl"
      />
    </div>
  );
}

function Div23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[500px] left-20 top-24 w-[1280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div21 />
      <Button2 />
      <Button3 />
      <Div22 />
    </div>
  );
}

function Section1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[692px] left-0 top-[1177px] w-[1440px]"
      data-name="section"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div23 />
    </div>
  );
}

function Div24() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[100px] left-0 top-0 w-[338.125px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Playfair_Display:Regular',_sans-serif] font-normal h-16 leading-[0] left-0 text-[#1a1a1a] text-[48px] text-left top-[-14.48px] w-[329px]">
        <p className="block leading-[60px]">Membres actifs</p>
      </div>
      <div className="absolute font-['Playfair_Display:Regular',_sans-serif] font-normal h-8 leading-[0] left-0 text-[24px] text-gray-600 text-left top-[61.6px] w-[307px]">
        <p className="block leading-[32px]">Armateurs du Saint-Laurent</p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_507)">
            <path
              d={svgPaths.p3a537480}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_507">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0 w-3.5"
      data-name="svg"
    >
      <Frame15 />
    </div>
  );
}

function I3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[17px] top-4 w-3.5"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg3 />
    </div>
  );
}

function Button4() {
  return (
    <div
      className="absolute bg-blue-900 left-0 rounded-[9999px] size-12 top-0"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I3 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p18af0c00}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg4() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0 w-3.5"
      data-name="svg"
    >
      <Frame16 />
    </div>
  );
}

function I4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[17px] top-4 w-3.5"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg4 />
    </div>
  );
}

function Button5() {
  return (
    <div
      className="absolute bg-blue-900 left-14 rounded-[9999px] size-12 top-0"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I4 />
    </div>
  );
}

function Div25() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[1112px] top-[26px] w-[104px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Div26() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[100px] left-8 top-0 w-[1216px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div24 />
      <Div25 />
    </div>
  );
}

function Button6() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.8)] h-9 left-[97.02px] rounded-[9999px] top-[173px] w-[125.969px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-[17px] leading-[0] left-[63px] not-italic text-[#000000] text-[14px] text-center top-[7.98px] translate-x-[-50%] w-[94px]">
        <p className="block leading-[normal]">En savoir plus</p>
      </div>
    </div>
  );
}

function Div27() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#0000004d] h-[225px] left-0 to-[#00000000] top-0 w-80"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Img5() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-[225px] left-0 top-0 w-80"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg5}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div28() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[225px] left-0 top-[225px] w-80"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button6 />
      <Div27 />
      <Img5 />
    </div>
  );
}

function Img6() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat left-0 size-12 top-0"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg6}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div29() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-0 rounded-[9999px] size-12 top-0"
      data-name="div"
    >
      <div className="overflow-clip relative size-12">
        <Img6 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Div30() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-40 left-6 top-6 w-[272px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div29 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[#1a1a1a] text-[20px] text-left top-[62.08px] w-[117px]">
        <p className="block leading-[28px]">Groupe CSL</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[60px] leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[102.4px] w-[270px]">
        <p className="block leading-[20px]">
          Leader mondial du transport maritime en vrac avec une flotte de
          navires spécialisés pour les Grands Lacs.
        </p>
      </div>
    </div>
  );
}

function Div31() {
  return (
    <div
      className="absolute bg-blue-100 h-[450px] left-[108px] rounded-2xl top-0 w-80"
      data-name="div"
    >
      <div className="h-[450px] overflow-clip relative w-80">
        <Div28 />
        <Div30 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl"
      />
    </div>
  );
}

function Button7() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.8)] h-9 left-[97.02px] rounded-[9999px] top-[173px] w-[125.969px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-[17px] leading-[0] left-[63px] not-italic text-[#000000] text-[14px] text-center top-[7.98px] translate-x-[-50%] w-[94px]">
        <p className="block leading-[normal]">En savoir plus</p>
      </div>
    </div>
  );
}

function Div32() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#0000004d] h-[225px] left-0 to-[#00000000] top-0 w-80"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Img7() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-[225px] left-0 top-0 w-80"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg7}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div33() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[225px] left-0 top-[225px] w-80"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button7 />
      <Div32 />
      <Img7 />
    </div>
  );
}

function Img8() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat left-0 size-12 top-0"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg8}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div34() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-0 rounded-[9999px] size-12 top-0"
      data-name="div"
    >
      <div className="overflow-clip relative size-12">
        <Img8 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Div35() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-40 left-6 top-6 w-[272px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div34 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[#1a1a1a] text-[20px] text-left top-[62.08px] w-[152px]">
        <p className="block leading-[28px]">Algoma Central</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[60px] leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[102.4px] w-[253px]">
        <p className="block leading-[20px]">{`Compagnie maritime canadienne avec plus de 125 ans d'expérience dans le transport sur les Grands Lacs.`}</p>
      </div>
    </div>
  );
}

function Div36() {
  return (
    <div
      className="absolute bg-[#cde5f3] h-[450px] left-[460px] rounded-2xl top-0 w-80"
      data-name="div"
    >
      <div className="h-[450px] overflow-clip relative w-80">
        <Div33 />
        <Div35 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl"
      />
    </div>
  );
}

function Button8() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.8)] h-9 left-[97.02px] rounded-[9999px] top-[173px] w-[125.969px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-[17px] leading-[0] left-[63px] not-italic text-[#000000] text-[14px] text-center top-[7.98px] translate-x-[-50%] w-[94px]">
        <p className="block leading-[normal]">En savoir plus</p>
      </div>
    </div>
  );
}

function Div37() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#0000004d] h-[225px] left-0 to-[#00000000] top-0 w-80"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Img9() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-[225px] left-0 top-0 w-80"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg9}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div38() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[225px] left-0 top-[225px] w-80"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button8 />
      <Div37 />
      <Img9 />
    </div>
  );
}

function Img10() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat left-0 size-12 top-0"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg10}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div39() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-0 rounded-[9999px] size-12 top-0"
      data-name="div"
    >
      <div className="overflow-clip relative size-12">
        <Img10 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Div40() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-40 left-6 top-6 w-[272px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div39 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[#1a1a1a] text-[20px] text-left top-[61.8px] w-[199px]">
        <p className="block leading-[28px]">Lower Lakes Towing</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[60px] leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[102.4px] w-[246px]">
        <p className="block leading-[20px]">
          Armateur canadien spécialisé dans le transport de vrac sec sur la Voie
          Maritime du Saint-Laurent.
        </p>
      </div>
    </div>
  );
}

function Div41() {
  return (
    <div
      className="absolute bg-[#fcf2c9] h-[450px] left-[812px] rounded-2xl top-0 w-80"
      data-name="div"
    >
      <div className="h-[450px] overflow-clip relative w-80">
        <Div38 />
        <Div40 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl"
      />
    </div>
  );
}

function Button9() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.8)] h-9 left-[97.02px] rounded-[9999px] top-[173px] w-[125.969px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-[17px] leading-[0] left-[63px] not-italic text-[#000000] text-[14px] text-center top-[7.98px] translate-x-[-50%] w-[94px]">
        <p className="block leading-[normal]">En savoir plus</p>
      </div>
    </div>
  );
}

function Div42() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#0000004d] h-[225px] left-0 to-[#00000000] top-0 w-80"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Img11() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-[225px] left-0 top-0 w-80"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg11}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div43() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[225px] left-0 top-[225px] w-80"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button9 />
      <Div42 />
      <Img11 />
    </div>
  );
}

function Img12() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat left-0 size-12 top-0"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg12}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div44() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-0 rounded-[9999px] size-12 top-0"
      data-name="div"
    >
      <div className="overflow-clip relative size-12">
        <Img12 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Div45() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-40 left-6 top-6 w-[272px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div44 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[#1a1a1a] text-[20px] text-left top-[61.8px] w-[139px]">
        <p className="block leading-[28px]">McKeil Marine</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[60px] leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[102.4px] w-[273px]">
        <p className="block leading-[20px]">
          Entreprise familiale canadienne offrant des services de transport
          maritime et de remorquage sur les Grands Lacs.
        </p>
      </div>
    </div>
  );
}

function Div46() {
  return (
    <div
      className="absolute bg-[#d2e7d6] h-[450px] left-[1164px] rounded-2xl top-0 w-80"
      data-name="div"
    >
      <div className="h-[450px] overflow-clip relative w-80">
        <Div43 />
        <Div45 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl"
      />
    </div>
  );
}

function Div47() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[466px] left-[-75px] top-[140px] w-[1431px]"
      data-name="div"
    >
      <div className="h-[466px] overflow-clip relative w-[1431px]">
        <Div31 />
        <Div36 />
        <Div41 />
        <Div46 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div48() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[606px] left-20 top-[1787px] w-[1280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div26 />
      <Div47 />
    </div>
  );
}

function Div49() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.05)] left-[-96px] rounded-[9999px] size-48 top-[338px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Div50() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.1)] left-[1088px] rounded-[9999px] size-64 top-[-128px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Span4() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.2)] h-7 left-0 rounded top-0 w-[169.031px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[17px] leading-[0] left-3 not-italic text-[#ffffff] text-[14px] text-left top-[3.81px] w-36">
        <p className="block leading-[normal]">ÉVÉNEMENT À VENIR</p>
      </div>
    </div>
  );
}

function Div51() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-0 top-0 w-[1120px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Span4 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[181.03px] not-italic text-[16px] text-[rgba(255,255,255,0.8)] text-left top-[0.16px] w-[130px]">
        <p className="block leading-[24px]">15 FÉVRIER 2024</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="h-4 relative shrink-0 w-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_501)">
            <path
              d={svgPaths.p30aca800}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_501">
            <path d="M0 0H12V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3"
      data-name="Frame"
    >
      <Frame17 />
    </div>
  );
}

function Div52() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-0 w-[256.312px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame18 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-5 not-italic text-[#ffffff] text-[16px] text-left top-[-1.12px] w-[236px]">
        <p className="block leading-[24px]">Centre des congrès de Québec</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_21_478)">
            <path
              d={svgPaths.p803d900}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_21_478">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-1"
      data-name="Frame"
    >
      <Frame19 />
    </div>
  );
}

function Div53() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[272.31px] top-0 w-[125.141px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame20 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-6 not-italic text-[#ffffff] text-[16px] text-left top-[-0.88px] w-[102px]">
        <p className="block leading-[24px]">9h00 - 17h00</p>
      </div>
    </div>
  );
}

function Div54() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-56 w-[1120px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div52 />
      <Div53 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="h-4 relative shrink-0 w-[18px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 16"
      >
        <g id="Frame">
          <path d="M18 16H0V0H18V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p29a0d880}
            fill="var(--fill-0, #1E3A8A)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0 w-[18px]"
      data-name="svg"
    >
      <Frame21 />
    </div>
  );
}

function I5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-8 top-[21px] w-[18px]"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg5 />
    </div>
  );
}

function Button10() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[58px] left-0 rounded-[9999px] top-0 w-[157.625px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I5 />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-5 leading-[0] left-[92px] not-italic text-[16px] text-blue-900 text-center top-[17.7px] translate-x-[-50%] w-[68px]">
        <p className="block leading-[normal]">Billeterie</p>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p18af0c00}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame23() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[148.39px] overflow-clip p-0 top-[21px] w-3.5"
      data-name="Frame"
    >
      <Frame22 />
    </div>
  );
}

function Button11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[58px] left-[173.63px] rounded-[9999px] top-0 w-[195.391px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-5 leading-[0] left-[86.5px] not-italic text-[#ffffff] text-[16px] text-center top-[17.7px] translate-x-[-50%] w-[107px]">
        <p className="block leading-[normal]">En savoir plus</p>
      </div>
      <Frame23 />
    </div>
  );
}

function Div55() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[58px] left-0 top-[280px] w-[1120px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button10 />
      <Button11 />
    </div>
  );
}

function Div56() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[338px] left-12 top-12 w-[1120px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div51 />
      <div className="absolute font-['Playfair_Display:Regular',_sans-serif] font-normal h-16 leading-[0] left-0 text-[#ffffff] text-[48px] text-left top-[30.88px] w-[566px]">
        <p className="block leading-[48px]">Conférence Maritime 2025</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[84px] leading-[0] left-0 not-italic text-[20px] text-[rgba(255,255,255,0.9)] text-left top-[112.56px] w-[661px]">
        <p className="block leading-[28px]">{`Forum annuel sur l'avenir du transport maritime sur les Grands Lacs et la Voie Maritime du Saint-Laurent. Rejoignez les leaders de l'industrie pour discuter des innovations et défis du secteur.`}</p>
      </div>
      <Div54 />
      <Div55 />
    </div>
  );
}

function Div57() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#1e3a8a] h-[434px] left-8 rounded-3xl to-[#1e40af] top-0 w-[1216px]"
      data-name="div"
    >
      <div className="h-[434px] overflow-clip relative w-[1216px]">
        <Div49 />
        <Div50 />
        <Div56 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-3xl"
      />
    </div>
  );
}

function Img13() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-48 left-0 top-0 w-96"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg13}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div58() {
  return (
    <div
      className="absolute bg-blue-100 h-48 left-0 top-0 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Img13 />
    </div>
  );
}

function Span5() {
  return (
    <div
      className="absolute bg-blue-900 h-6 left-0 rounded top-0 w-[102.141px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-2 not-italic text-[#ffffff] text-[12px] text-left text-nowrap top-[3.1px]">
        <p className="block leading-[normal] whitespace-pre">COMMUNIQUÉ</p>
      </div>
    </div>
  );
}

function Div59() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-6 top-6 w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Span5 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[110.14px] not-italic text-[14px] text-gray-500 text-left top-[0.8px] w-[95px]">
        <p className="block leading-[20px]">8 janvier 2024</p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="h-3 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 12"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_492)">
            <path
              d={svgPaths.p2ef7d000}
              fill="var(--fill-0, #1E3A8A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_492">
            <path d="M0 0H10.5V12H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3 items-center justify-center left-[84.89px] overflow-clip p-0 top-1 w-[10.5px]"
      data-name="Frame"
    >
      <Frame24 />
    </div>
  );
}

function Button12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-6 top-[204px] w-[95.391px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-[17px] leading-[0] left-[39px] not-italic text-[14px] text-blue-900 text-center top-[-0.02px] translate-x-[-50%] w-[78px]">
        <p className="block leading-[normal]">Lire la suite</p>
      </div>
      <Frame25 />
    </div>
  );
}

function Div60() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[248px] left-0 top-48 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div59 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-14 leading-[0] left-6 not-italic text-[#1a1a1a] text-[20px] text-left top-[56.48px] w-[317px]">
        <p className="block leading-[28px]">
          Investissements de 250M$ pour moderniser la Voie Maritime
        </p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[60px] leading-[0] left-6 not-italic text-[14px] text-gray-600 text-left top-[130.4px] w-[325px]">
        <p className="block leading-[20px]">{`Le gouvernement annonce des investissements majeurs pour améliorer l'infrastructure de la Voie Maritime du Saint-Laurent.`}</p>
      </div>
      <Button12 />
    </div>
  );
}

function Article() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[440px] left-0 rounded-2xl top-0 w-96"
      data-name="article"
    >
      <div className="h-[440px] overflow-clip relative w-96">
        <Div58 />
        <Div60 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Img14() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-48 left-0 top-0 w-96"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg14}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div61() {
  return (
    <div
      className="absolute bg-[#cde5f3] h-48 left-0 top-0 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Img14 />
    </div>
  );
}

function Span6() {
  return (
    <div
      className="absolute bg-green-600 h-6 left-0 rounded top-0 w-[62.375px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-2 not-italic text-[#ffffff] text-[12px] text-left text-nowrap top-[3.33px]">
        <p className="block leading-[normal] whitespace-pre">PROJET</p>
      </div>
    </div>
  );
}

function Div62() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-6 top-6 w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Span6 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[70.38px] not-italic text-[14px] text-gray-500 text-left top-[0.8px] w-[95px]">
        <p className="block leading-[20px]">5 janvier 2024</p>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="h-3 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 12"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_492)">
            <path
              d={svgPaths.p2ef7d000}
              fill="var(--fill-0, #1E3A8A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_492">
            <path d="M0 0H10.5V12H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame27() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3 items-center justify-center left-[133.13px] overflow-clip p-0 top-1 w-[10.5px]"
      data-name="Frame"
    >
      <Frame26 />
    </div>
  );
}

function Button13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-6 top-[204px] w-[143.625px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-[17px] leading-[0] left-[63px] not-italic text-[14px] text-blue-900 text-center top-[-0.02px] translate-x-[-50%] w-[126px]">
        <p className="block leading-[normal]">Découvrir le projet</p>
      </div>
      <Frame27 />
    </div>
  );
}

function Div63() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[248px] left-0 top-48 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div62 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-14 leading-[0] left-6 not-italic text-[#1a1a1a] text-[20px] text-left top-[57.04px] w-[295px]">
        <p className="block leading-[28px]">
          Initiative Verte: Réduction des émissions de 30%
        </p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[60px] leading-[0] left-6 not-italic text-[14px] text-gray-600 text-left top-[130.4px] w-[333px]">
        <p className="block leading-[20px]">{`Lancement d'un programme collaboratif pour réduire l'empreinte carbone du transport maritime sur le Saint-Laurent.`}</p>
      </div>
      <Button13 />
    </div>
  );
}

function Article1() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[440px] left-[416px] rounded-2xl top-0 w-96"
      data-name="article"
    >
      <div className="h-[440px] overflow-clip relative w-96">
        <Div61 />
        <Div63 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Img15() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-48 left-0 top-0 w-96"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg15}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div64() {
  return (
    <div
      className="absolute bg-[#fcf2c9] h-48 left-0 top-0 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Img15 />
    </div>
  );
}

function Span7() {
  return (
    <div
      className="absolute bg-orange-500 h-6 left-0 rounded top-0 w-[89.813px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-2 not-italic text-[#ffffff] text-[12px] text-left text-nowrap top-[3.1px]">
        <p className="block leading-[normal] whitespace-pre">ÉVÉNEMENT</p>
      </div>
    </div>
  );
}

function Div65() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-6 top-6 w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Span7 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[97.81px] not-italic text-[14px] text-gray-500 text-left top-[0.8px] w-[95px]">
        <p className="block leading-[20px]">2 janvier 2024</p>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="h-3 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 12"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_492)">
            <path
              d={svgPaths.p2ef7d000}
              fill="var(--fill-0, #1E3A8A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_492">
            <path d="M0 0H10.5V12H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame29() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3 items-center justify-center left-[140.75px] overflow-clip p-0 top-1 w-[10.5px]"
      data-name="Frame"
    >
      <Frame28 />
    </div>
  );
}

function Button14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-6 top-[204px] w-[151.25px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-[17px] leading-[0] left-[67px] not-italic text-[14px] text-blue-900 text-center top-[-0.02px] translate-x-[-50%] w-[134px]">
        <p className="block leading-[normal]">Voir les statistiques</p>
      </div>
      <Frame29 />
    </div>
  );
}

function Div66() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[248px] left-0 top-48 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div65 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-14 leading-[0] left-6 not-italic text-[#1a1a1a] text-[20px] text-left top-[57.04px] w-[300px]">
        <p className="block leading-[28px]">
          Bilan 2023: Record de tonnage transporté
        </p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[60px] leading-[0] left-6 not-italic text-[14px] text-gray-600 text-left top-[130.4px] w-[323px]">
        <p className="block leading-[20px]">{`Les membres d'ASL ont transporté plus de 42 millions de tonnes en 2023, un record historique pour l'association.`}</p>
      </div>
      <Button14 />
    </div>
  );
}

function Article2() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[440px] left-[832px] rounded-2xl top-0 w-96"
      data-name="article"
    >
      <div className="h-[440px] overflow-clip relative w-96">
        <Div64 />
        <Div66 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Img16() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-48 left-0 top-0 w-96"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg16}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div67() {
  return (
    <div
      className="absolute bg-[#d2e7d6] h-48 left-0 top-0 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Img16 />
    </div>
  );
}

function Span8() {
  return (
    <div
      className="absolute bg-blue-600 h-6 left-0 rounded top-0 w-[87.281px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-2 not-italic text-[#ffffff] text-[12px] text-left text-nowrap top-[3.33px]">
        <p className="block leading-[normal] whitespace-pre">FORMATION</p>
      </div>
    </div>
  );
}

function Div68() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-6 top-6 w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Span8 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[95.28px] not-italic text-[14px] text-gray-500 text-left top-[0.8px] w-[127px]">
        <p className="block leading-[20px]">28 décembre 2023</p>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="h-3 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 12"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_492)">
            <path
              d={svgPaths.p2ef7d000}
              fill="var(--fill-0, #1E3A8A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_492">
            <path d="M0 0H10.5V12H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame31() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3 items-center justify-center left-[72.59px] overflow-clip p-0 top-1 w-[10.5px]"
      data-name="Frame"
    >
      <Frame30 />
    </div>
  );
}

function Button15() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-6 top-[204px] w-[83.094px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-[17px] leading-[0] left-[31.5px] not-italic text-[14px] text-blue-900 text-center top-[-0.02px] translate-x-[-50%] w-[63px]">
        <p className="block leading-[normal]">{`S'inscrire`}</p>
      </div>
      <Frame31 />
    </div>
  );
}

function Div69() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[248px] left-0 top-48 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div68 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-14 leading-[0] left-6 not-italic text-[#1a1a1a] text-[20px] text-left top-[57.04px] w-[272px]">
        <p className="block leading-[28px]">
          Programme de formation en sécurité maritime
        </p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[60px] leading-[0] left-6 not-italic text-[14px] text-gray-600 text-left top-[130.4px] w-[300px]">
        <p className="block leading-[20px]">
          Nouveau programme de certification pour les équipages naviguant sur la
          Voie Maritime du Saint-Laurent.
        </p>
      </div>
      <Button15 />
    </div>
  );
}

function Article3() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[440px] left-0 rounded-2xl top-[472px] w-96"
      data-name="article"
    >
      <div className="h-[440px] overflow-clip relative w-96">
        <Div67 />
        <Div69 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Img17() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-48 left-0 top-0 w-96"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg17}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div70() {
  return (
    <div
      className="absolute bg-[#f9ddcb] h-48 left-0 top-0 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Img17 />
    </div>
  );
}

function Span9() {
  return (
    <div
      className="absolute bg-purple-600 h-6 left-0 rounded top-0 w-[89.984px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-2 not-italic text-[#ffffff] text-[12px] text-left text-nowrap top-[3.33px]">
        <p className="block leading-[normal] whitespace-pre">INNOVATION</p>
      </div>
    </div>
  );
}

function Div71() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-6 top-6 w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Span9 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[97.98px] not-italic text-[14px] text-gray-500 text-left top-[0.8px] w-[127px]">
        <p className="block leading-[20px]">22 décembre 2023</p>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="h-3 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 12"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_492)">
            <path
              d={svgPaths.p2ef7d000}
              fill="var(--fill-0, #1E3A8A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_492">
            <path d="M0 0H10.5V12H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame33() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3 items-center justify-center left-[101.97px] overflow-clip p-0 top-1 w-[10.5px]"
      data-name="Frame"
    >
      <Frame32 />
    </div>
  );
}

function Button16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-6 top-[204px] w-[112.469px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-[17px] leading-[0] left-[47px] not-italic text-[14px] text-blue-900 text-center top-[-0.02px] translate-x-[-50%] w-[94px]">
        <p className="block leading-[normal]">En savoir plus</p>
      </div>
      <Frame33 />
    </div>
  );
}

function Div72() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[248px] left-0 top-48 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div71 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-14 leading-[0] left-6 not-italic text-[#1a1a1a] text-[20px] text-left top-[57.04px] w-[280px]">
        <p className="block leading-[28px]">
          Digitalisation des opérations portuaires
        </p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[60px] leading-[0] left-6 not-italic text-[14px] text-gray-600 text-left top-[129.8px] w-[328px]">
        <p className="block leading-[20px]">
          Mise en place de systèmes de suivi en temps réel pour optimiser les
          opérations de chargement et déchargement.
        </p>
      </div>
      <Button16 />
    </div>
  );
}

function Article4() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[440px] left-[416px] rounded-2xl top-[472px] w-96"
      data-name="article"
    >
      <div className="h-[440px] overflow-clip relative w-96">
        <Div70 />
        <Div72 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Img18() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-48 left-0 top-0 w-96"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg18}')` }}
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div73() {
  return (
    <div
      className="absolute bg-blue-100 h-48 left-0 top-0 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Img18 />
    </div>
  );
}

function Span10() {
  return (
    <div
      className="absolute bg-red-600 h-6 left-0 rounded top-0 w-[97.016px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-2 not-italic text-[#ffffff] text-[12px] text-left text-nowrap top-[3.33px]">
        <p className="block leading-[normal] whitespace-pre">PARTENARIAT</p>
      </div>
    </div>
  );
}

function Div74() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-6 top-6 w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Span10 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[105.02px] not-italic text-[14px] text-gray-500 text-left top-[0.8px] w-[125px]">
        <p className="block leading-[20px]">18 décembre 2023</p>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="h-3 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 12"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_492)">
            <path
              d={svgPaths.p2ef7d000}
              fill="var(--fill-0, #1E3A8A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_492">
            <path d="M0 0H10.5V12H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame35() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3 items-center justify-center left-[91.73px] overflow-clip p-0 top-1 w-[10.5px]"
      data-name="Frame"
    >
      <Frame34 />
    </div>
  );
}

function Button17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-6 top-[204px] w-[102.234px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-[17px] leading-[0] left-[41px] not-italic text-[14px] text-blue-900 text-center top-[-0.02px] translate-x-[-50%] w-[82px]">
        <p className="block leading-[normal]">{`Lire l'accord`}</p>
      </div>
      <Frame35 />
    </div>
  );
}

function Div75() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[248px] left-0 top-48 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div74 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-14 leading-[0] left-6 not-italic text-[#1a1a1a] text-[20px] text-left top-[57.04px] w-[307px]">
        <p className="block leading-[28px]">
          Accord de coopération avec les ports européens
        </p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[60px] leading-[0] left-6 not-italic text-[14px] text-gray-600 text-left top-[130.4px] w-[331px]">
        <p className="block leading-[20px]">{`Signature d'un protocole d'entente pour faciliter les échanges commerciaux entre le Saint-Laurent et l'Europe.`}</p>
      </div>
      <Button17 />
    </div>
  );
}

function Article5() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[440px] left-[832px] rounded-2xl top-[472px] w-96"
      data-name="article"
    >
      <div className="h-[440px] overflow-clip relative w-96">
        <Div73 />
        <Div75 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Div76() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[912px] left-0 top-24 w-[1216px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Article />
      <Article1 />
      <Article2 />
      <Article3 />
      <Article4 />
      <Article5 />
    </div>
  );
}

function I6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[229.58px] top-5 w-[300px]"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Button18() {
  return (
    <div
      className="absolute bg-blue-900 h-14 left-[327.2px] rounded-[9999px] top-0 w-[561.578px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I6 />
    </div>
  );
}

function Div77() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-0 top-[1056px] w-[1216px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button18 />
    </div>
  );
}

function Div78() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1112px] left-8 top-[498px] w-[1216px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Playfair_Display:Regular',_sans-serif] font-normal h-16 leading-[0] left-[601.98px] text-[#1a1a1a] text-[48px] text-center top-[-21.12px] translate-x-[-50%] w-[432px]">
        <p className="block leading-[48px]">Dernières actualités</p>
      </div>
      <Div76 />
      <Div77 />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-5 leading-[0] left-[603.5px] not-italic text-[#ffffff] text-[16px] text-center top-[1072.7px] translate-x-[-50%] w-[191px]">
        <p className="block leading-[normal]">Voir toutes les actualités</p>
      </div>
    </div>
  );
}

function Div79() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1610px] left-20 top-[2448px] w-[1280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div57 />
      <Div78 />
    </div>
  );
}

function Div80() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-0 top-0 w-[268px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-14 leading-[0] left-0 not-italic text-[#ffffff] text-[20px] text-left top-[-2px] w-[268px]">
        <p className="block leading-[28px]">Armateurs Saint- Laurent</p>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path d={svgPaths.p52f6272} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg6() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0 w-3.5"
      data-name="svg"
    >
      <Frame36 />
    </div>
  );
}

function I7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[13px] top-3 w-3.5"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg6 />
    </div>
  );
}

function Span11() {
  return (
    <div
      className="absolute bg-gray-700 left-0 rounded-[9999px] size-10 top-0"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I7 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <path d="M16 16H0V0H16V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path d={svgPaths.pea09c00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg7() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-4 top-0"
      data-name="svg"
    >
      <Frame37 />
    </div>
  );
}

function I8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-3 size-4 top-3"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg7 />
    </div>
  );
}

function Span12() {
  return (
    <div
      className="absolute bg-gray-700 left-14 rounded-[9999px] size-10 top-0"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I8 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="h-4 relative shrink-0 w-2.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 10 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_489)">
            <path
              d={svgPaths.pb142d80}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_489">
            <path d="M0 0H10V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg8() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0 w-2.5"
      data-name="svg"
    >
      <Frame38 />
    </div>
  );
}

function I9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[15px] top-3 w-2.5"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg8 />
    </div>
  );
}

function Span13() {
  return (
    <div
      className="absolute bg-gray-700 left-28 rounded-[9999px] size-10 top-0"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I9 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="h-4 relative shrink-0 w-[18px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 16"
      >
        <g id="Frame">
          <path d="M18 16H0V0H18V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p30bd3f00}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg9() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0 w-[18px]"
      data-name="svg"
    >
      <Frame39 />
    </div>
  );
}

function I10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[11px] top-3 w-[18px]"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg9 />
    </div>
  );
}

function Span14() {
  return (
    <div
      className="absolute bg-gray-700 left-[168px] rounded-[9999px] size-10 top-0"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I10 />
    </div>
  );
}

function Div81() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 top-56 w-[268px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Span11 />
      <Span12 />
      <Span13 />
      <Span14 />
    </div>
  );
}

function Div82() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[276px] left-0 top-0 w-[268px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div80 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[120px] leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[54px] w-[267px]">
        <p className="block leading-[24px]">
          Association représentant les armateurs canadiens depuis 1936. Nous
          soutenons le développement du transport maritime sur le Saint- Laurent
          et les Grands Lacs.
        </p>
      </div>
      <Div81 />
    </div>
  );
}

function Li() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-0 w-[268px]"
      data-name="li"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-1.2px] w-[115px]">
        <p className="block leading-[24px]">{`À propos d'ASL`}</p>
      </div>
    </div>
  );
}

function Li1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-10 w-[268px]"
      data-name="li"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-0.4px] w-[105px]">
        <p className="block leading-[24px]">Nos membres</p>
      </div>
    </div>
  );
}

function Li2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-20 w-[268px]"
      data-name="li"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-0.4px] w-[126px]">
        <p className="block leading-[24px]">Le Saint-Laurent</p>
      </div>
    </div>
  );
}

function Li3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-[120px] w-[268px]"
      data-name="li"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-0.4px] w-[66px]">
        <p className="block leading-[24px]">Dossiers</p>
      </div>
    </div>
  );
}

function Li4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-40 w-[268px]"
      data-name="li"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-1.2px] w-[93px]">
        <p className="block leading-[24px]">Événements</p>
      </div>
    </div>
  );
}

function Li5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-[200px] w-[268px]"
      data-name="li"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-0.6px] w-[75px]">
        <p className="block leading-[24px]">Actualités</p>
      </div>
    </div>
  );
}

function Ul() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-56 left-0 top-[52px] w-[268px]"
      data-name="ul"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Li />
      <Li1 />
      <Li2 />
      <Li3 />
      <Li4 />
      <Li5 />
    </div>
  );
}

function Div83() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[276px] left-[316px] top-0 w-[268px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-0 not-italic text-[#ffffff] text-[18px] text-left top-[-0.92px] w-[94px]">
        <p className="block leading-[28px]">Navigation</p>
      </div>
      <Ul />
    </div>
  );
}

function Li6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-0 w-[268px]"
      data-name="li"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-0.6px] w-[115px]">
        <p className="block leading-[24px]">Représentation</p>
      </div>
    </div>
  );
}

function Li7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-10 w-[268px]"
      data-name="li"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-0.4px] w-[78px]">
        <p className="block leading-[24px]">Promotion</p>
      </div>
    </div>
  );
}

function Li8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-20 w-[268px]"
      data-name="li"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-0.4px] w-[76px]">
        <p className="block leading-[24px]">Formation</p>
      </div>
    </div>
  );
}

function Li9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-[120px] w-[268px]"
      data-name="li"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-0.6px] w-[133px]">
        <p className="block leading-[24px]">Sécurité maritime</p>
      </div>
    </div>
  );
}

function Li10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-40 w-[268px]"
      data-name="li"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-0.6px] w-[119px]">
        <p className="block leading-[24px]">Réglementation</p>
      </div>
    </div>
  );
}

function Li11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-[200px] w-[268px]"
      data-name="li"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-0.4px] w-[116px]">
        <p className="block leading-[24px]">Portail membre</p>
      </div>
    </div>
  );
}

function Ul1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-56 left-0 top-[52px] w-[268px]"
      data-name="ul"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Li6 />
      <Li7 />
      <Li8 />
      <Li9 />
      <Li10 />
      <Li11 />
    </div>
  );
}

function Div84() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[276px] left-[632px] top-0 w-[268px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-0 not-italic text-[#ffffff] text-[18px] text-left top-[-0.92px] w-[76px]">
        <p className="block leading-[28px]">Services</p>
      </div>
      <Ul1 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="h-4 relative shrink-0 w-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_480)">
            <path
              d={svgPaths.p30aca800}
              fill="var(--fill-0, #1E3A8A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_480">
            <path d="M0 0H12V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame41() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3"
      data-name="Frame"
    >
      <Frame40 />
    </div>
  );
}

function Div85() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[72px] left-6 top-0 w-[156.766px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[-0.88px] w-[33px]">
        <p className="block leading-[24px]">101-</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[22.88px] w-[158px]">
        <p className="block leading-[24px]">Québec, QC G1R 1S9</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-300 text-left top-[47.12px] w-[58px]">
        <p className="block leading-[24px]">Canada</p>
      </div>
    </div>
  );
}

function Div86() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[72px] left-0 top-0 w-[268px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame41 />
      <Div85 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_25_477)">
            <path
              d={svgPaths.p9204100}
              fill="var(--fill-0, #1E3A8A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_25_477">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame43() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-1"
      data-name="Frame"
    >
      <Frame42 />
    </div>
  );
}

function Div87() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-[88px] w-[268px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame43 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-7 not-italic text-[16px] text-gray-300 text-left top-[-1.36px] w-[141px]">
        <p className="block leading-[24px]">+1 (418) 692-4681</p>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <path d="M16 16H0V0H16V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.pa71cb00}
            fill="var(--fill-0, #1E3A8A)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame45() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-1"
      data-name="Frame"
    >
      <Frame44 />
    </div>
  );
}

function Div88() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-32 w-[268px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame45 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-7 not-italic text-[16px] text-gray-300 text-left top-[-0.88px] w-[133px]">
        <p className="block leading-[24px]">info@armateur.ca</p>
      </div>
    </div>
  );
}

function Div89() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[152px] left-0 top-[52px] w-[268px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div86 />
      <Div87 />
      <Div88 />
    </div>
  );
}

function Button19() {
  return (
    <div
      className="absolute bg-blue-900 h-12 left-0 rounded-[9999px] top-[228px] w-[166.906px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-5 leading-[0] left-[84px] not-italic text-[#ffffff] text-[16px] text-center top-[12.8px] translate-x-[-50%] w-[120px]">
        <p className="block leading-[normal]">Nous contacter</p>
      </div>
    </div>
  );
}

function Div90() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[276px] left-[948px] top-0 w-[268px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-0 not-italic text-[#ffffff] text-[18px] text-left top-[-0.64px] w-[70px]">
        <p className="block leading-[28px]">Contact</p>
      </div>
      <Div89 />
      <Button19 />
    </div>
  );
}

function Div91() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[276px] left-8 top-16 w-[1216px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div82 />
      <Div83 />
      <Div84 />
      <Div90 />
    </div>
  );
}

function Div92() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[404px] left-20 top-0 w-[1280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div91 />
    </div>
  );
}

function Input() {
  return (
    <div
      className="absolute bg-gray-700 h-12 left-0 rounded-[9999px] top-0 w-[304.078px]"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-12 justify-center leading-[0] left-4 not-italic text-[#adaebc] text-[16px] text-left top-6 translate-y-[-50%] w-[150px]">
        <p className="block leading-[24px]">Votre adresse email</p>
      </div>
    </div>
  );
}

function Button20() {
  return (
    <div
      className="absolute bg-blue-900 h-12 left-[320.08px] rounded-[9999px] top-0 w-[127.922px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-5 leading-[0] left-[63.5px] not-italic text-[#ffffff] text-[16px] text-center top-[12.8px] translate-x-[-50%] w-[79px]">
        <p className="block leading-[normal]">{`S'abonner`}</p>
      </div>
    </div>
  );
}

function Div93() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-96 top-24 w-[448px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Input />
      <Button20 />
    </div>
  );
}

function Div94() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-36 left-8 top-12 w-[1216px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-8 leading-[0] left-[608.38px] not-italic text-[#ffffff] text-[24px] text-center top-[-5.08px] translate-x-[-50%] w-[175px]">
        <p className="block leading-[32px]">Restez informé</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[606.98px] not-italic text-[16px] text-center text-gray-300 top-[46.88px] translate-x-[-50%] w-[539px]">
        <p className="block leading-[24px]">{`Recevez nos dernières actualités et mises à jour sur l'industrie maritime`}</p>
      </div>
      <Div93 />
    </div>
  );
}

function Div95() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[272px] left-20 top-px w-[1280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div94 />
    </div>
  );
}

function Div96() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[273px] left-0 top-[404px] w-[1440px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-[1px_0px_0px] border-gray-700 border-solid inset-0 pointer-events-none"
      />
      <Div95 />
    </div>
  );
}

function Div97() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[384.297px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[17px] leading-[0] left-0 not-italic text-[14px] text-gray-400 text-left top-[-0.02px] w-96">
        <p className="block leading-[normal]">
          © 2025 Armateurs du Saint-Laurent. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}

function Div98() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[765.8px] top-0 w-[450.203px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-400 text-left top-[-1.2px] w-44">
        <p className="block leading-[20px]">Politique de confidentialité</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[199.11px] not-italic text-[14px] text-gray-400 text-left top-[-1.2px] w-[151px]">
        <p className="block leading-[20px]">{`Conditions d'utilisation`}</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[373.63px] not-italic text-[14px] text-gray-400 text-left top-[-1.2px] w-[77px]">
        <p className="block leading-[20px]">Plan du site</p>
      </div>
    </div>
  );
}

function Div99() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-8 top-6 w-[1216px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div97 />
      <Div98 />
    </div>
  );
}

function Div100() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[68px] left-20 top-px w-[1280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div99 />
    </div>
  );
}

function Div101() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[69px] left-0 top-[677px] w-[1440px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-[1px_0px_0px] border-gray-700 border-solid inset-0 pointer-events-none"
      />
      <Div100 />
    </div>
  );
}

function Footer() {
  return (
    <div
      className="absolute bg-[#1a1a1a] h-[746px] left-0 top-[4336px] w-[1440px]"
      data-name="footer"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div92 />
      <Div96 />
      <Div101 />
    </div>
  );
}

function Div102() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[5082px] left-0 top-0 w-[1440px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Section />
      <Div16 />
      <Div20 />
      <Section1 />
      <Div48 />
      <Div79 />
      <Footer />
    </div>
  );
}

function Body() {
  return (
    <div
      className="bg-[#f8f3ed] h-[5082px] relative shrink-0 w-[1440px]"
      data-name="body"
    >
      <div className="h-[5082px] overflow-clip relative w-[1440px]">
        <Div102 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

export default function Frame46() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-lg size-full"
      data-name="Frame"
    >
      <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative size-full">
        <Body />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#ced4da] border-solid inset-0 pointer-events-none rounded-lg"
      />
    </div>
  );
}