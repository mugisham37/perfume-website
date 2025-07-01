import { FC } from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import type { KeyTextField, RichTextField, LinkField } from "@prismicio/client";
import { FadeIn } from "../../components/FadeIn";
import { RevealText } from "../../components/RevealText";
import { ButtonLink } from "../../components/ButtonLink";
import { Bounded } from "../../components/Bounded";

/**
 * Props for `CallToAction`.
 */
export interface CallToActionSlice {
  id: string;
  slice_type: "call_to_action";
  variation: "default";
  primary: {
    eyebrow: KeyTextField;
    heading: RichTextField;
    body: RichTextField;
    button: Array<{
      key: string;
      variant: "Primary" | "Secondary";
    } & LinkField>;
  };
  items: Array<never>;
}

export type CallToActionProps = SliceComponentProps<CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction: FC<CallToActionProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden bg-[url('/background.avif')] bg-cover bg-center py-16 text-gray-50 md:py-28"
    >
      <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
        <FadeIn
          className="translate-y-2 text-sm font-light tracking-[.2em] uppercase"
          vars={{ duration: 0.8 }}
        >
          {slice.primary.eyebrow}
        </FadeIn>

        <RevealText
          id="cta-heading"
          field={slice.primary.heading}
          as="h2"
          className="font-display mx-auto max-w-3xl text-5xl sm:text-6xl md:text-7xl"
          align="center"
          staggerAmount={0.1}
          duration={0.8}
        />

        <FadeIn
          className="mx-auto max-w-2xl translate-y-2 text-lg text-balance text-gray-300"
          vars={{ duration: 0.8, delay: 0.4 }}
        >
          <PrismicRichText field={slice.primary.body} />
        </FadeIn>

        <div className="mt-10">
          {slice.primary.button.map((link) => (
            <FadeIn key={link.key}>
              <ButtonLink field={link} variant={link.variant} />
            </FadeIn>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default CallToAction;
