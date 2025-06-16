import { FormBlocksType } from "@/@types/form-block.type";
import { HeadingBlock } from "@/components/form-builder/blocks/HeadingBlock";
import { RowLayoutBlock } from "@/components/form-builder/blocks/layouts/RowLayout";
import { ParagraphBlock } from "@/components/form-builder/blocks/ParagraphBlock";
import { RadioSelectBlock } from "@/components/form-builder/blocks/RadioSelectBlock";
import { StarRatingBlock } from "@/components/form-builder/blocks/StarRatingBlock";
import { TextAreaBlock } from "@/components/form-builder/blocks/TextAreaBlock";
import { TextFieldBlock } from "@/components/form-builder/blocks/TextField";

export const FormBlocks: FormBlocksType = {
  RowLayout: RowLayoutBlock,
  Heading: HeadingBlock,
  Paragraph: ParagraphBlock,
  TextField: TextFieldBlock,
  TextArea: TextAreaBlock,
  RadioSelect: RadioSelectBlock,
  StarRating: StarRatingBlock,
};
