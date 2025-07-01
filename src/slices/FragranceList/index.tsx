import { FC } from "react";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import type { KeyTextField, RichTextField, ContentRelationshipField } from "@prismicio/client";
import { isFilled } from "@prismicio/client";

import { Bounded } from "../../components/Bounded";
import { RevealText } from "../../components/RevealText";
import { FragranceDisplay } from "./FragranceDisplay";

/**
 * Props for `FragranceList`.
 */
export interface FragranceListSlice {
  id: string;
  slice_type: "fragrance_list";
  variation: "default";
  primary: {
    eyebrow: KeyTextField;
    heading: RichTextField;
    body: RichTextField;
    fragrances: Array<{
      fragrance: ContentRelationshipField;
    }>;
  };
  items: Array<never>;
}

export type FragranceListProps = SliceComponentProps<FragranceListSlice>;

/**
 * Component for "FragranceList" Slices.
 */
const FragranceList: FC<FragranceListProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="space-y-8 bg-black py-16 text-center text-white md:py-24"
    >
      <div className="mx-auto space-y-8">
        <p className="text-sm font-light tracking-[0.2em] uppercase">
          {slice.primary.eyebrow}
        </p>
        <RevealText
          field={slice.primary.heading}
          as="h2"
          id={`fragrance-list-heading-${slice.id}`}
          align="center"
          duration={1.5}
          staggerAmount={0.3}
          className="font-display text-5xl uppercase sm:text-6xl md:text-7xl lg:text-8xl"
        />

        <div className="mx-auto max-w-2xl text-lg text-balance text-gray-300">
          <PrismicRichText field={slice.primary.body} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12">
          {slice.primary.fragrances.map((item, index) => {
            if (isFilled.contentRelationship(item.fragrance)) {
              return (
                <FragranceDisplay
                  key={item.fragrance.id || index}
                  id={item.fragrance.id}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </Bounded>
  );
};

export default FragranceList;
