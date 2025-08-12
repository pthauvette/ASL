import svgPaths from "./svg-uz7u5t2bie";

function Div() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-6 w-[46.844px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-0 not-italic text-[#000033] text-[24px] text-left top-0 w-[47px]">
        <p className="block leading-[32px]">ASL</p>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-20 left-0 top-0 w-[46.844px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div />
    </div>
  );
}

function Span() {
  return (
    <div
      className="absolute bg-[#000033] h-9 left-[940.73px] rounded-md top-[22px] w-[162.547px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-4 not-italic text-[#ffffff] text-[14px] text-left top-[9px] w-[136px]">
        <p className="block leading-[normal]">Connexion membre</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-20 left-[112.72px] top-0 w-[1103.28px]"
      data-name="nav"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-9 leading-[0] left-3 not-italic text-[#43464b] text-[14px] text-left top-[22px] w-[116px]">
        <p className="block leading-[20px]">Devenir membre</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-9 leading-[0] left-[178.28px] not-italic text-[#43464b] text-[14px] text-left top-[22px] w-[124px]">
        <p className="block leading-[20px]">{`À propos de l'ASL`}</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-9 leading-[0] left-[352.81px] not-italic text-[#43464b] text-[14px] text-left top-[22px] w-[170px]">
        <p className="block leading-[20px]">Répertoire des membres</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-9 leading-[0] left-[572.97px] not-italic text-[#43464b] text-[14px] text-left top-[22px] w-[191px]">
        <p className="block leading-[20px]">Opportunités de partenariat</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-9 leading-[0] left-[814.38px] not-italic text-[#43464b] text-[14px] text-left top-[22px] w-[88px]">
        <p className="block leading-[20px]">Événements</p>
      </div>
      <Span />
    </div>
  );
}

function Div2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-20 left-8 top-0 w-[1216px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div1 />
      <Nav />
    </div>
  );
}

function Div3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-20 left-20 top-0 w-[1280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div2 />
    </div>
  );
}

function Header() {
  return (
    <div
      className="absolute bg-[#ffffff] h-20 left-0 top-0 w-[1440px]"
      data-name="header"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
      <Div3 />
    </div>
  );
}

function H2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-8 top-8 w-[457.5px]"
      data-name="h2"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-0 not-italic text-[#000033] text-[24px] text-left top-px w-[312px]">
        <p className="block leading-[normal]">Connexion à votre compte</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[457.5px]"
      data-name="label"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[#43464b] text-[14px] text-left top-px w-[116px]">
        <p className="block leading-[normal]">Adresse courriel</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[50px] left-0 rounded-lg top-0 w-[457.5px]"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-lg"
      />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[50px] justify-center leading-[0] left-11 not-italic text-[#adaebc] text-[16px] text-left top-[25px] translate-y-[-50%] w-[458px]">
        <p className="block leading-[24px]">Entrez votre courriel</p>
      </div>
    </div>
  );
}

function Frame() {
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
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-3 overflow-clip p-0 size-4 top-5"
      data-name="Frame"
    >
      <Frame />
    </div>
  );
}

function Div4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[50px] left-0 top-7 w-[457.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Input />
      <Frame1 />
    </div>
  );
}

function Div5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[78px] left-0 top-0 w-[457.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Label />
      <Div4 />
    </div>
  );
}

function Label1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[457.5px]"
      data-name="label"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[#43464b] text-[14px] text-left top-px w-24">
        <p className="block leading-[normal]">Mot de passe</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[50px] left-0 rounded-lg top-0 w-[457.5px]"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-lg"
      />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[50px] justify-center leading-[0] left-11 not-italic text-[#adaebc] text-[16px] text-left top-[25px] translate-y-[-50%] w-[458px]">
        <p className="block leading-[24px]">Entrez votre mot de passe</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_21_502)">
            <path
              d={svgPaths.pcd0dd00}
              fill="var(--fill-0, #9CA3AF)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_21_502">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-3 overflow-clip p-0 top-5 w-3.5"
      data-name="Frame"
    >
      <Frame2 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-4 relative shrink-0 w-[18px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_21_508)">
            <path
              d={svgPaths.p27070ff0}
              fill="var(--fill-0, #9CA3AF)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_21_508">
            <path d="M0 0H18V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-[18px]"
      data-name="Frame"
    >
      <Frame4 />
    </div>
  );
}

function Button() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[427.5px] top-4 w-[18px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame5 />
    </div>
  );
}

function Div6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[50px] left-0 top-7 w-[457.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Input1 />
      <Frame3 />
      <Button />
    </div>
  );
}

function Div7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[78px] left-0 top-[102px] w-[457.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Label1 />
      <Div6 />
    </div>
  );
}

function Input2() {
  return (
    <div
      className="absolute bg-[#ffffff] left-0 rounded-[1px] size-4 top-0.5"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#000000] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[1px]"
      />
    </div>
  );
}

function Label2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[150.5px]"
      data-name="label"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Input2 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-6 not-italic text-[#43464b] text-[14px] text-left top-0 w-[127px]">
        <p className="block leading-[20px]">Se souvenir de moi</p>
      </div>
    </div>
  );
}

function Div8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-[204px] w-[457.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Label2 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[316.47px] not-italic text-[#000033] text-[14px] text-left top-0 w-[142px]">
        <p className="block leading-[20px]">Mot de passe oublié?</p>
      </div>
    </div>
  );
}

function Frame6() {
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
          <path d={svgPaths.pca5de00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-4 top-1"
      data-name="svg"
    >
      <Frame6 />
    </div>
  );
}

function I() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[165.92px] top-3 w-4"
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

function Button1() {
  return (
    <div
      className="absolute bg-[#000033] h-12 left-0 rounded-lg top-[248px] w-[457.5px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg"
      />
      <I />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[243.42px] not-italic text-[#ffffff] text-[16px] text-center top-3.5 translate-x-[-50%] w-[107px]">
        <p className="block leading-[normal]">Se connecter</p>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[296px] left-8 top-[88px] w-[457.5px]"
      data-name="form"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div5 />
      <Div7 />
      <Div8 />
      <Button1 />
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-0 rounded-lg top-[61px] w-[457.5px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#000033] border-solid inset-0 pointer-events-none rounded-lg"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[231.73px] not-italic text-[#000033] text-[16px] text-center top-4 translate-x-[-50%] w-[132px]">
        <p className="block leading-[normal]">Devenir membre</p>
      </div>
    </div>
  );
}

function Div9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[113px] left-8 top-[416px] w-[457.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[231.31px] not-italic text-[#43464b] text-[14px] text-center top-[25px] translate-x-[-50%] w-[195px]">
        <p className="block leading-[20px]">{`Vous n'avez pas de compte?`}</p>
      </div>
      <Button2 />
    </div>
  );
}

function Div10() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[561px] left-0 rounded-lg top-0 w-[521.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
      <H2 />
      <Form />
      <Div9 />
    </div>
  );
}

function H3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-8 top-8 w-[454.5px]"
      data-name="h3"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[#000033] text-[20px] text-left top-0.5 w-[206px]">
        <p className="block leading-[normal]">Avantages membres</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-4 relative shrink-0 w-5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_21_493)">
            <path
              d={svgPaths.p1b4569c0}
              fill="var(--fill-0, #000033)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_21_493">
            <path d="M0 0H20V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-5"
      data-name="svg"
    >
      <Frame7 />
    </div>
  );
}

function I1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-2.5 top-2 w-5"
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

function Div11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,51,0.1)] left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I1 />
    </div>
  );
}

function Div12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-14 top-0 w-[398.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[#000033] text-[16px] text-left top-0 w-[159px]">
        <p className="block leading-[24px]">Réseautage exclusif</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-0 not-italic text-[#43464b] text-[14px] text-left top-6 w-[386px]">
        <p className="block leading-[20px]">{`Connectez-vous avec des professionnels de l'industrie et élargissez votre réseau.`}</p>
      </div>
    </div>
  );
}

function Div13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-0 top-0 w-[454.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div11 />
      <Div12 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_21_487)">
            <path
              d={svgPaths.p3256de00}
              fill="var(--fill-0, #000033)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_21_487">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-3.5"
      data-name="svg"
    >
      <Frame8 />
    </div>
  );
}

function I2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[13px] top-2 w-3.5"
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

function Div14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,51,0.1)] left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I2 />
    </div>
  );
}

function Div15() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-14 top-0 w-[398.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[#000033] text-[16px] text-left top-0 w-[261px]">
        <p className="block leading-[24px]">Accès prioritaire aux événements</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-0 not-italic text-[#43464b] text-[14px] text-left top-6 w-[315px]">
        <p className="block leading-[20px]">
          Inscription anticipée aux webinaires, ateliers et conférences.
        </p>
      </div>
    </div>
  );
}

function Div16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-0 top-20 w-[454.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div14 />
      <Div15 />
    </div>
  );
}

function Frame9() {
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
            d={svgPaths.p22371f0}
            fill="var(--fill-0, #000033)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-[18px]"
      data-name="svg"
    >
      <Frame9 />
    </div>
  );
}

function I3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[11px] top-2 w-[18px]"
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

function Div17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,51,0.1)] left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I3 />
    </div>
  );
}

function Div18() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-14 top-0 w-[398.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[#000033] text-[16px] text-left top-0 w-[214px]">
        <p className="block leading-[24px]">Bibliothèque de ressources</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-0 not-italic text-[#43464b] text-[14px] text-left top-6 w-[396px]">
        <p className="block leading-[20px]">{`Accès à des recherches exclusives, rapports et analyses de l'industrie.`}</p>
      </div>
    </div>
  );
}

function Div19() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-0 top-40 w-[454.5px]"
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

function Frame10() {
  return (
    <div className="h-4 relative shrink-0 w-5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 16"
      >
        <g id="Frame">
          <path d="M20 16H0V0H20V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p8134300}
            fill="var(--fill-0, #000033)"
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
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-5"
      data-name="svg"
    >
      <Frame10 />
    </div>
  );
}

function I4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-2.5 top-2 w-5"
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

function Div20() {
  return (
    <div
      className="absolute bg-[rgba(0,0,51,0.1)] left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I4 />
    </div>
  );
}

function Div21() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-14 top-0 w-[396.719px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[#000033] text-[16px] text-left top-0 w-[217px]">
        <p className="block leading-[24px]">Opportunités de partenariat</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[#43464b] text-[14px] text-left top-6 w-[397px]">
        <p className="block leading-[20px]">
          Collaborez sur des projets et des entreprises commerciales.
        </p>
      </div>
    </div>
  );
}

function Div22() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-0 top-60 w-[454.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div20 />
      <Div21 />
    </div>
  );
}

function Div23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[284px] left-8 top-[84px] w-[454.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div13 />
      <Div16 />
      <Div19 />
      <Div22 />
    </div>
  );
}

function Div24() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[400px] left-0 rounded-lg top-0 w-[518.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
      <H3 />
      <Div23 />
    </div>
  );
}

function Frame11() {
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
          <path d={svgPaths.pa71cb00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-1"
      data-name="Frame"
    >
      <Frame11 />
    </div>
  );
}

function Div25() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-0 w-[454.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame12 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-7 not-italic text-[#ffffff] text-[14px] text-left top-0.5 w-[110px]">
        <p className="block leading-[20px]">support@asl.org</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_21_490)">
            <path
              d={svgPaths.p9204100}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_21_490">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-1"
      data-name="Frame"
    >
      <Frame13 />
    </div>
  );
}

function Div26() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-9 w-[454.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame14 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-7 not-italic text-[#ffffff] text-[14px] text-left top-0.5 w-[109px]">
        <p className="block leading-[20px]">1-800-ASL-AIDE</p>
      </div>
    </div>
  );
}

function Frame15() {
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

function Frame16() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-1"
      data-name="Frame"
    >
      <Frame15 />
    </div>
  );
}

function Div27() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-[72px] w-[454.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame16 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-7 not-italic text-[#ffffff] text-[14px] text-left top-0.5 w-[183px]">
        <p className="block leading-[20px]">Lun-Ven, 9h00 - 17h00 EST</p>
      </div>
    </div>
  );
}

function Div28() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-24 left-8 top-[172px] w-[454.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div25 />
      <Div26 />
      <Div27 />
    </div>
  );
}

function Div29() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#000033] h-[300px] left-0 rounded-lg to-[#000033cc] top-[424px] w-[518.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-8 not-italic text-[#ffffff] text-[20px] text-left top-8 w-[149px]">
        <p className="block leading-[28px]">{`Besoin d'aide?`}</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[72px] leading-[0] left-8 not-italic text-[16px] text-[rgba(255,255,255,0.9)] text-left top-[76px] w-[432px]">
        <p className="block leading-[24px]">
          Notre équipe de support est là pour vous aider avec tout problème de
          connexion ou questions concernant votre adhésion.
        </p>
      </div>
      <Div28 />
    </div>
  );
}

function Div30() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[724px] left-[569.5px] top-0 w-[518.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div24 />
      <Div29 />
    </div>
  );
}

function Div31() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[724px] left-8 top-[308.5px] w-[1088px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div10 />
      <Div30 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="h-[30px] relative shrink-0 w-[37.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 38 30"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_21_475)">
            <path
              d={svgPaths.p28f8c100}
              fill="var(--fill-0, #000033)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_21_475">
            <path d="M0 0H37.5V30H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[30px] items-center justify-center left-0 p-0 top-[2.75px] w-[37.5px]"
      data-name="svg"
    >
      <Frame17 />
    </div>
  );
}

function I5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[154.58px] top-6 w-[37.5px]"
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

function H4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-6 top-[60px] w-[298.656px]"
      data-name="h3"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-[151.91px] not-italic text-[#000033] text-[16px] text-center top-0.5 translate-x-[-50%] w-[229px]">
        <p className="block leading-[normal]">Inscription nouveau membre</p>
      </div>
    </div>
  );
}

function P() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-6 top-[92px] w-[298.656px]"
      data-name="p"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[152.23px] not-italic text-[#43464b] text-[14px] text-center top-px translate-x-[-50%] w-[262px]">
        <p className="block leading-[normal]">{`Commencez votre parcours avec l'ASL`}</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[151.84px] not-italic text-[#43464b] text-[14px] text-center top-[21px] translate-x-[-50%] w-[79px]">
        <p className="block leading-[normal]">{`aujourd'hui`}</p>
      </div>
    </div>
  );
}

function Div32() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[156px] left-0 rounded-lg top-0 w-[346.656px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
      <I5 />
      <H4 />
      <P />
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_21_472)">
            <path
              d={svgPaths.p3cdfcb80}
              fill="var(--fill-0, #000033)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_21_472">
            <path d="M0 0H30V30H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg6() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-[30px] top-[2.75px]"
      data-name="svg"
    >
      <Frame18 />
    </div>
  );
}

function I6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[158.33px] top-6 w-[30px]"
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

function H5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-6 top-[60px] w-[298.672px]"
      data-name="h3"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-[152.06px] not-italic text-[#000033] text-[16px] text-center top-0.5 translate-x-[-50%] w-[223px]">
        <p className="block leading-[normal]">Réinitialiser le mot de passe</p>
      </div>
    </div>
  );
}

function P1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-6 top-[92px] w-[298.672px]"
      data-name="p"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[151.88px] not-italic text-[#43464b] text-[14px] text-center top-px translate-x-[-50%] w-[230px]">
        <p className="block leading-[normal]">{`Récupérez l'accès à votre compte`}</p>
      </div>
    </div>
  );
}

function Div33() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[156px] left-[370.66px] rounded-lg top-0 w-[346.672px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
      <I6 />
      <H5 />
      <P1 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_21_469)">
            <path
              d={svgPaths.p388e9000}
              fill="var(--fill-0, #000033)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_21_469">
            <path d="M0 0H30V30H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg7() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-[30px] top-[2.75px]"
      data-name="svg"
    >
      <Frame19 />
    </div>
  );
}

function I7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[158.33px] top-6 w-[30px]"
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

function H6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-6 top-[60px] w-[298.656px]"
      data-name="h3"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-[152.13px] not-italic text-[#000033] text-[16px] text-center top-0.5 translate-x-[-50%] w-[111px]">
        <p className="block leading-[normal]">{`Centre d'aide`}</p>
      </div>
    </div>
  );
}

function P2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-6 top-[92px] w-[298.656px]"
      data-name="p"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[151.97px] not-italic text-[#43464b] text-[14px] text-center top-px translate-x-[-50%] w-[248px]">
        <p className="block leading-[normal]">
          Trouvez des réponses aux questions
        </p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[151.98px] not-italic text-[#43464b] text-[14px] text-center top-[21px] translate-x-[-50%] w-[77px]">
        <p className="block leading-[normal]">fréquentes</p>
      </div>
    </div>
  );
}

function Div34() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[156px] left-[741.33px] rounded-lg top-0 w-[346.656px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
      <I7 />
      <H6 />
      <P2 />
    </div>
  );
}

function Div35() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[156px] left-0 top-16 w-[1088px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div32 />
      <Div33 />
      <Div34 />
    </div>
  );
}

function Div36() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[220px] left-8 top-[1096.5px] w-[1088px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-[546.77px] not-italic text-[#000033] text-[24px] text-center top-0 translate-x-[-50%] w-[159px]">
        <p className="block leading-[32px]">Accès rapide</p>
      </div>
      <Div35 />
    </div>
  );
}

function Main() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1380.5px] left-36 top-[-176px] w-[1152px]"
      data-name="main"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div31 />
      <Div36 />
    </div>
  );
}

function Div37() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-36 left-0 top-0 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[#ffffff] text-[20px] text-left top-0 w-[45px]">
        <p className="block leading-[28px]">ASL</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[60px] leading-[0] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-left top-11 w-[277px]">
        <p className="block leading-[20px]">
          Connecter les professionnels et favoriser la croissance dans la région
          du Saint- Laurent.
        </p>
      </div>
    </div>
  );
}

function Div38() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-left top-px w-[123px]">
        <p className="block leading-[normal]">{`À propos de l'ASL`}</p>
      </div>
    </div>
  );
}

function Div39() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-7 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-left top-px w-[168px]">
        <p className="block leading-[normal]">Répertoire des membres</p>
      </div>
    </div>
  );
}

function Div40() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-14 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-left top-px w-[87px]">
        <p className="block leading-[normal]">Événements</p>
      </div>
    </div>
  );
}

function Div41() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-[84px] w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-left top-px w-[85px]">
        <p className="block leading-[normal]">Partenariats</p>
      </div>
    </div>
  );
}

function Div42() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[104px] left-0 top-10 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div38 />
      <Div39 />
      <Div40 />
      <Div41 />
    </div>
  );
}

function Div43() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-36 left-[312px] top-0 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[#ffffff] text-[16px] text-left top-0 w-[108px]">
        <p className="block leading-[24px]">Liens rapides</p>
      </div>
      <Div42 />
    </div>
  );
}

function Div44() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-left top-px w-[95px]">
        <p className="block leading-[normal]">{`Centre d'aide`}</p>
      </div>
    </div>
  );
}

function Div45() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-7 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-left top-px w-[107px]">
        <p className="block leading-[normal]">Nous contacter</p>
      </div>
    </div>
  );
}

function Div46() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-14 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-left top-px w-[181px]">
        <p className="block leading-[normal]">Politique de confidentialité</p>
      </div>
    </div>
  );
}

function Div47() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-[84px] w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-left top-px w-[156px]">
        <p className="block leading-[normal]">{`Conditions d'utilisation`}</p>
      </div>
    </div>
  );
}

function Div48() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[104px] left-0 top-10 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div44 />
      <Div45 />
      <Div46 />
      <Div47 />
    </div>
  );
}

function Div49() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-36 left-[624px] top-0 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[#ffffff] text-[16px] text-left top-0 w-[67px]">
        <p className="block leading-[24px]">Support</p>
      </div>
      <Div48 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="h-5 relative shrink-0 w-[17.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 20"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_21_499)">
            <path
              d={svgPaths.p1fd35c80}
              fill="var(--fill-0, white)"
              fillOpacity="0.8"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_21_499">
            <path d="M0 0H17.5V20H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-5 items-center justify-center left-0 overflow-clip p-0 top-[3.5px] w-[17.5px]"
      data-name="Frame"
    >
      <Frame20 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 size-5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Frame">
          <path d="M20 20H0V0H20V20Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p998e00}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
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
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[33.5px] overflow-clip p-0 size-5 top-[3.5px]"
      data-name="Frame"
    >
      <Frame22 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="relative shrink-0 size-5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_21_481)">
            <path
              d={svgPaths.p17f8d700}
              fill="var(--fill-0, white)"
              fillOpacity="0.8"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_21_481">
            <path d="M0 0H20V20H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[69.5px] overflow-clip p-0 size-5 top-[3.5px]"
      data-name="Frame"
    >
      <Frame24 />
    </div>
  );
}

function Div50() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-0 top-10 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame21 />
      <Frame23 />
      <Frame25 />
    </div>
  );
}

function Div51() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-36 left-[936px] top-0 w-[280px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[#ffffff] text-[16px] text-left top-0 w-[86px]">
        <p className="block leading-[24px]">Connecter</p>
      </div>
      <Div50 />
    </div>
  );
}

function Div52() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-36 left-8 top-12 w-[1216px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div37 />
      <Div43 />
      <Div49 />
      <Div51 />
    </div>
  );
}

function Div53() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[53px] left-8 top-56 w-[1216px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[610.77px] not-italic text-[14px] text-[rgba(255,255,255,0.6)] text-center top-[33px] translate-x-[-50%] w-[234px]">
        <p className="block leading-[20px]">
          © 2024 ASL. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}

function Div54() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[325px] left-20 top-0 w-[1280px]"
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

function Footer() {
  return (
    <div
      className="absolute bg-[#000033] h-[325px] left-0 top-[1540.5px] w-[1440px]"
      data-name="footer"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div54 />
    </div>
  );
}

function Body() {
  return (
    <div
      className="bg-[#fafaf0] h-[1865.5px] relative shrink-0 w-[1440px]"
      data-name="body"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default function Frame26() {
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