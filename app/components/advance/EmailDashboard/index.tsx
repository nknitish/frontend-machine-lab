import { useEffect, useMemo, useState, memo } from "react";

/* -------------------- TYPES -------------------- */

interface Email {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  time: string;
  body: string;
}

/* -------------------- DATA -------------------- */

const rowData: Email[] = [
  {
    id: "email_001",
    senderName: "Sarah Johnson",
    senderEmail: "sarah.johnson@company.com",
    subject: "Q4 Marketing Campaign Results",
    time: "2026-01-12T09:15:00Z",
    body: "<p>We exceeded our marketing targets by 23%. Email open rate 34%.</p>",
  },
  {
    id: "email_002",
    senderName: "Michael Chen",
    senderEmail: "m.chen@company.com",
    subject: "Meeting Rescheduled - Product Review",
    time: "2026-01-12T10:30:00Z",
    body: "<p>The product review meeting has been moved to Thursday at 2 PM.</p>",
  },
  {
    id: "email_003",
    senderName: "Jessica Martinez",
    senderEmail: "jessica.martinez@company.com",
    subject: "Urgent: Server Downtime Tonight",
    time: "2026-01-12T14:45:00Z",
    body: "<p>Scheduled maintenance will cause downtime from 11 PM to 2 AM.</p>",
  },
];

/* -------------------- UTILS -------------------- */

const extractTextFromHTML = (html: string = ""): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const highlightText = (text: string, search: string): string => {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};

/* -------------------- HOOKS -------------------- */

const useDebounce = (value: string, delay: number = 300): string => {
  const [debounced, setDebounced] = useState<string>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
};

/* -------------------- COMPONENTS -------------------- */

interface EmailBodyProps {
  text: string;
  search: string;
  expanded: boolean;
}

const EmailBody = ({ text, search, expanded }: EmailBodyProps) => {
  const displayText = expanded ? text : text.slice(0, 120) + "...";

  return (
    <p
      className="text-sm text-gray-700"
      dangerouslySetInnerHTML={{
        __html: highlightText(displayText, search),
      }}
    />
  );
};

interface EmailCardProps {
  email: Email;
  search: string;
}

const EmailCard = memo(({ email, search }: EmailCardProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const plainText = useMemo(
    () => extractTextFromHTML(email.body),
    [email.body],
  );

  return (
    <div className="border rounded p-3 mb-2 bg-gray-100 shadow">
      <div className="flex items-center mb-1">
        <strong>{email.senderName}</strong>
        <span className="ml-4 italic text-gray-600">{email.subject}</span>
        <span className="ml-auto text-xs text-gray-500">
          {new Date(email.time).toLocaleString()}
        </span>
      </div>

      <EmailBody text={plainText} search={search} expanded={expanded} />

      <button
        className="text-blue-600 text-xs mt-1"
        onClick={() => setExpanded((p) => !p)}
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
});

/* -------------------- DASHBOARD -------------------- */

const EmailDashboard = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search);

  const filteredEmails = useMemo(() => {
    if (!debouncedSearch) return rowData;

    const q = debouncedSearch.toLowerCase();

    return rowData.filter(
      (email) =>
        email.senderName.toLowerCase().includes(q) ||
        email.senderEmail.toLowerCase().includes(q) ||
        email.subject.toLowerCase().includes(q) ||
        extractTextFromHTML(email.body).toLowerCase().includes(q),
    );
  }, [debouncedSearch]);

  return (
    <div className="w-[800px] mx-auto mt-10">
      <input
        type="search"
        placeholder="Search emails..."
        className="w-full mb-4 p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredEmails.map((email) => (
        <EmailCard key={email.id} email={email} search={debouncedSearch} />
      ))}
    </div>
  );
};

/* -------------------- APP -------------------- */

export default function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <EmailDashboard />
    </div>
  );
}
