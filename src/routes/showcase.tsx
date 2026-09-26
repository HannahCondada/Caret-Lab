import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Alert, Avatar, Badge, Button, Checkbox, Combobox, CurrencyField, DateField, Dialog, Drawer, FileUpload, Input, Link, Menu, Quantity, Search, Select, Table, Tabs, Tag, Textarea, ThemeScope, Timeline, Toast } from "@caret-lab/ui";

export const Route = createFileRoute("/showcase")({
  head: () => ({
    meta: [
      { title: "Showcase — Caret Library" },
      { name: "description", content: "A finished claim form and submit modal built only from Caret Library components." },
      { property: "og:title", content: "Showcase — Caret Library" },
      { property: "og:description", content: "A finished claim form and submit modal built only from Caret Library components." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Showcase,
});

function SubmitDialog({ trigger, defaultOpen = false }: { trigger: ReactNode; defaultOpen?: boolean }) {
  return (
    <Dialog defaultOpen={defaultOpen} trigger={trigger} title="Submit this claim?" confirmLabel="Submit claim">
      <div className="modal-copy">
        <Alert title="Ready to submit">Maya Chen will be asked to approve CLM-1042.</Alert>
        <Input label="Claim title" defaultValue="Client dinner" />
        <CurrencyField label="Amount" />
        <Checkbox label="Notify me when this is paid" defaultChecked />
      </div>
    </Dialog>
  );
}

function ClaimForm() {
  return (
    <form className="claim-form" onSubmit={(event) => event.preventDefault()}>
      <div className="claim-head">
        <Avatar name="Maya Chen" />
        <Badge>Draft</Badge>
        <span className="claim-tags">
          <Tag onRemove={() => undefined}>travel</Tag>
          <Tag onRemove={() => undefined}>client</Tag>
        </span>
        <Menu label="Claim actions" items={[{ label: "Duplicate" }, { label: "Void claim" }]} />
      </div>
      <Alert title="Receipt required">Attach a receipt before this claim can be submitted.</Alert>
      <Tabs
        items={[
          {
            value: "details",
            label: "Details",
            content: (
              <div className="claim-grid">
                <div className="span-2">
                  <Search label="Bill to project" defaultValue="Northstar Studio" />
                </div>
                <Input label="Claim title" defaultValue="Client dinner" />
                <Select label="Category" options={[{ value: "meals", label: "Meals" }, { value: "travel", label: "Travel" }, { value: "lodging", label: "Lodging" }]} />
                <CurrencyField label="Amount" />
                <DateField label="Expense date" defaultValue="2026-09-18" />
                <Combobox label="Approver" options={["Maya Chen", "Owen Reed", "Ari Patel"]} />
                <Quantity label="Attendees" />
                <div className="span-2">
                  <Textarea label="Notes" defaultValue="Dinner with the Northstar Studio team after the design review." />
                </div>
                <div className="span-2">
                  <FileUpload label="Receipt" accept="image/*,.pdf" />
                </div>
                <div className="span-2 claim-confirm">
                  <Checkbox label="I confirm this expense is billable" defaultChecked />
                  <Link href="#policy">Expense policy</Link>
                </div>
              </div>
            ),
          },
          {
            value: "items",
            label: "Line items",
            content: (
              <Table
                columns={["Item", "Qty", "Amount", "Status"]}
                rows={[
                  ["Design review", "2", "USD 800.00", <Badge intent="positive" key="approved">Approved</Badge>],
                  ["Client dinner", "4", "USD 450.00", <Badge key="draft">Draft</Badge>],
                ]}
              />
            ),
          },
        ]}
      />
      <div className="claim-actions">
        <Drawer trigger={<Button variant="secondary">Approval history</Button>} title="Approval history">
          <div className="modal-copy">
            <Timeline items={[{ title: "Submitted", detail: "Claim CLM-1042", time: "09:12" }, { title: "Waiting", detail: "Maya Chen", time: "Today" }]} />
            <Link href="#claim">Open CLM-1042</Link>
          </div>
        </Drawer>
        <div className="claim-buttons">
          <Toast trigger={<Button variant="secondary">Save draft</Button>} message="Draft saved" />
          <SubmitDialog trigger={<Button>Submit claim</Button>} />
        </div>
      </div>
    </form>
  );
}

function Showcase() {
  return (
    <main className="page">
      <div className="page-kicker">Samples / form and modal</div>
      <div className="page-heading">
        <div>
          <h1>Showcase</h1>
          <p>Finished pieces, assembled only from the catalog.</p>
        </div>
      </div>
      <div className="sample-stack">
        <section>
          <div className="section-label">
            <h2>Expense claim</h2>
            <span>Form</span>
          </div>
          <ThemeScope className="preview-frame sample-stage">
            <ClaimForm />
          </ThemeScope>
        </section>
        <section>
          <div className="section-label">
            <h2>Submit claim</h2>
            <span>Modal</span>
          </div>
          <ThemeScope className="preview-frame sample-stage modal-stage">
            <SubmitDialog defaultOpen trigger={<Button variant="secondary">Review claim</Button>} />
          </ThemeScope>
        </section>
      </div>
    </main>
  );
}
