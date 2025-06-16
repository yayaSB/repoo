import TableListView from "@/features/assessment/assessment-list/components/assessment-list-view";

export const metadata = {
  title: "Liste des évaluations",
};

export default function AssessmentListPage() {
    return (
        <TableListView role="evaluator"/>
    )
}
