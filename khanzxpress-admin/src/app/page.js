"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supa = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const RED = "#e8001d";
const RED2 = "#b0001a";
const BLK = "#0a0a0a";
const BLK2 = "#111111";
const BLK3 = "#1a1a1a";
const BLK4 = "#222222";
const WHT = "#ffffff";
const GRY = "#888888";
const GRY2 = "#aaaaaa";
const GRN = "#22c55e";
const YLW = "#f59e0b";
const BLU = "#3b82f6";

const MY_EMAIL = "khanzexpress.pk1@gmail.com";
const MY_PASS = "admin123";

function KZLogo({ sz }) {
  const t = sz === "lg" ? 24 : sz === "md" ? 18 : 13;
  const z = sz === "lg" ? 30 : sz === "md" ? 22 : 16;
  return (
    <div style={{ display: "flex", alignItems: "baseline" }}>
      <span style={{ fontFamily: "Arial Black,sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: t, color: WHT, letterSpacing: -1 }}>Khan</span>
      <span style={{ fontFamily: "Arial Black,sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: z, color: RED, letterSpacing: -1, borderBottom: "2px solid " + RED }}>Z</span>
      <span style={{ fontFamily: "Arial Black,sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: t, color: WHT, letterSpacing: -1 }}>xpress</span>
      <span style={{ fontFamily: "Arial Black,sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: t - 4, color: WHT, marginLeft: 2 }}>.pk</span>
    </div>
  );
}

function Lines() {
  return (
    <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
      <div style={{ width: 24, height: 2, background: RED, borderRadius: 2 }} />
      <div style={{ width: 14, height: 2, background: RED, opacity: .6, borderRadius: 2 }} />
      <div style={{ width: 7, height: 2, background: RED, opacity: .3, borderRadius: 2 }} />
    </div>
  );
}

function Box({ children, xtra }) {
  return <div style={{ background: BLK2, borderRadius: 12, border: "1px solid " + BLK3, ...xtra }}>{children}</div>;
}

function BoxTop({ title, right }) {
  return (
    <div style={{ padding: "14px 20px", borderBottom: "1px solid " + BLK3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ color: WHT, fontWeight: 700, fontSize: 14 }}>{title}</div>
      {right}
    </div>
  );
}

function TxtBox({ lbl, val, chg, ph, tp }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {lbl && <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: GRY2, marginBottom: 5, letterSpacing: .5 }}>{lbl}</label>}
      <input value={val} onChange={e => chg && chg(e.target.value)} placeholder={ph || ""} type={tp || "text"}
        style={{ width: "100%", background: BLK4, border: "1px solid " + BLK3, borderRadius: 8, padding: "10px 14px", color: WHT, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
        onFocus={e => e.target.style.borderColor = RED}
        onBlur={e => e.target.style.borderColor = BLK3} />
    </div>
  );
}

function Chip({ txt }) {
  const colors = {
    "active": [GRN, "rgba(34,197,94,0.12)"],
    "blocked": [RED, "rgba(232,0,29,0.12)"],
    "pending": [YLW, "rgba(245,158,11,0.12)"],
    "Delivered": [GRN, "rgba(34,197,94,0.12)"],
    "Returned": [RED, "rgba(232,0,29,0.12)"],
    "In Transit": [YLW, "rgba(245,158,11,0.12)"],
    "Booked": ["#a78bfa", "rgba(167,139,250,0.12)"],
    "Out for Delivery": [BLU, "rgba(59,130,246,0.12)"],
    "admin": [BLU, "rgba(59,130,246,0.12)"],
    "superadmin": [RED, "rgba(232,0,29,0.12)"],
  };
  const [c, bg] = colors[txt] || [GRY, "rgba(136,136,136,0.12)"];
  return <span style={{ background: bg, color: c, padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{txt}</span>;
}

// LOGIN PAGE
function LoginScreen({ onDone }) {
  const [inputEmail, setInputEmail] = useState(MY_EMAIL);
  const [inputPass, setInputPass] = useState(MY_PASS);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function tryLogin() {
    if (!inputEmail || !inputPass) { setErr("Fill all fields"); return; }
    setBusy(true); setErr("");
    if (inputEmail === MY_EMAIL && inputPass === MY_PASS) {
      const info = { name: "Muhammad Faizan", email: inputEmail, role: "superadmin" };
      try { localStorage.setItem("kzx_adm", JSON.stringify(info)); } catch(e) {}
      onDone(info);
    } else {
      const { data } = await supa.from("admins").select("*").eq("email", inputEmail).eq("password", inputPass).single();
      if (data) {
        try { localStorage.setItem("kzx_adm", JSON.stringify(data)); } catch(e) {}
        onDone(data);
      } else {
        setErr("Invalid email or password");
      }
    }
    setBusy(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: BLK, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Segoe UI,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 440, background: BLK2, borderRadius: 16, border: "1px solid " + BLK3, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.8)" }}>
        <div style={{ background: "linear-gradient(135deg," + RED + "," + RED2 + ")", padding: "28px", textAlign: "center" }}>
          <KZLogo sz="lg" /><Lines />
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 8, letterSpacing: 3 }}>ADMIN PORTAL</div>
        </div>
        <div style={{ padding: "32px" }}>
          <h2 style={{ color: WHT, fontSize: 20, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>Admin Login</h2>
          {err && <div style={{ background: "rgba(232,0,29,0.1)", border: "1px solid rgba(232,0,29,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#ffaaaa", fontSize: 13 }}>❌ {err}</div>}
          <TxtBox lbl="Email" val={inputEmail} chg={setInputEmail} ph="admin@khanzxpress.pk" tp="email" />
          <TxtBox lbl="Password" val={inputPass} chg={setInputPass} ph="••••••••" tp="password" />
          <button onClick={tryLogin} disabled={busy}
            style={{ width: "100%", background: RED, color: WHT, border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: "pointer", marginTop: 8, boxShadow: "0 4px 20px rgba(232,0,29,0.35)", opacity: busy ? .7 : 1, fontFamily: "inherit" }}>
            {busy ? "Logging in..." : "🔐 Login to Admin Panel"}
          </button>
        </div>
      </div>
    </div>
  );
}

// SIDEBAR + MAIN LAYOUT
function Shell({ who, pg, setPg, doLogout, children }) {
  const links = [
    { id: "dashboard", ico: "📊", lbl: "Dashboard" },
    { id: "customers", ico: "👥", lbl: "Customers" },
    { id: "bookings", ico: "📦", lbl: "All Bookings" },
    { id: "payments", ico: "💳", lbl: "Payments" },
    { id: "rates", ico: "⚙️", lbl: "Rate Settings" },
    { id: "reports", ico: "📈", lbl: "Reports" },
    { id: "admins", ico: "🔑", lbl: "Sub Admins" },
  ];
  const cur = links.find(l => l.id === pg);
  return (
    <div style={{ minHeight: "100vh", background: BLK, fontFamily: "Segoe UI,sans-serif", display: "flex" }}>
      <div style={{ width: 215, background: BLK2, borderRight: "1px solid " + BLK3, position: "fixed", top: 0, left: 0, bottom: 0, display: "flex", flexDirection: "column", zIndex: 50 }}>
        <div style={{ padding: "18px 16px", borderBottom: "1px solid " + BLK3 }}>
          <KZLogo sz="sm" /><Lines />
          <div style={{ fontSize: 9, color: GRY, marginTop: 4, letterSpacing: 1 }}>ADMIN CONTROL PANEL</div>
        </div>
        <div style={{ padding: "14px 12px", borderBottom: "1px solid " + BLK3 }}>
          <div style={{ background: "rgba(232,0,29,0.08)", border: "1px solid rgba(232,0,29,0.15)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg," + RED + "," + RED2 + ")", color: WHT, fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", boxShadow: "0 0 14px rgba(232,0,29,0.4)" }}>
              {who.name ? who.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div style={{ color: WHT, fontWeight: 600, fontSize: 12 }}>{who.name}</div>
            <div style={{ color: RED, fontSize: 10, marginTop: 2, fontWeight: 600 }}>
              {who.role === "superadmin" ? "⭐ Super Admin" : "🔑 Admin"}
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
          {links.map(lk => (
            <button key={lk.id} onClick={() => setPg(lk.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 2, textAlign: "left", background: pg === lk.id ? "rgba(232,0,29,0.12)" : "transparent", color: pg === lk.id ? WHT : GRY, borderLeft: "3px solid " + (pg === lk.id ? RED : "transparent"), fontSize: 13, fontWeight: pg === lk.id ? 600 : 400, fontFamily: "inherit" }}>
              {lk.ico} {lk.lbl}
            </button>
          ))}
        </nav>
        <div style={{ padding: "12px 10px", borderTop: "1px solid " + BLK3 }}>
          <button onClick={doLogout} style={{ width: "100%", background: "rgba(232,0,29,0.08)", color: RED, border: "1px solid rgba(232,0,29,0.2)", padding: "10px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 12, fontFamily: "inherit" }}>
            🚪 Logout
          </button>
        </div>
      </div>
      <div style={{ marginLeft: 215, flex: 1 }}>
        <div style={{ background: BLK2, borderBottom: "1px solid " + BLK3, padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 3, height: 20, background: RED, borderRadius: 2 }} />
            <div style={{ color: WHT, fontWeight: 700, fontSize: 17 }}>{cur ? cur.ico + " " + cur.lbl : ""}</div>
          </div>
          <div style={{ fontSize: 12, color: GRY }}>{new Date().toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
        </div>
        <div style={{ padding: "24px 28px" }}>{children}</div>
      </div>
    </div>
  );
}

// DASHBOARD
function DashPage({ setPg }) {
  const [nums, setNums] = useState({ customers: 0, bookings: 0, delivered: 0, returned: 0, cod: 0, pending: 0 });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function go() {
      const [{ count: cnt }, { data: bks }] = await Promise.all([
        supa.from("merchants").select("*", { count: "exact", head: true }),
        supa.from("bookings").select("*").order("created_at", { ascending: false }),
      ]);
      const b = bks || [];
      setNums({
        customers: cnt || 0,
        bookings: b.length,
        delivered: b.filter(x => x.status === "Delivered").length,
        returned: b.filter(x => x.status === "Returned").length,
        cod: b.filter(x => x.status === "Delivered").reduce((s, x) => s + Number(x.cod_amount || 0), 0),
        pending: b.filter(x => !["Delivered","Returned"].includes(x.status)).reduce((s, x) => s + Number(x.cod_amount || 0), 0),
      });
      setRows(b.slice(0, 8));
    }
    go();
  }, []);

  const cards = [
    { lbl: "Total Customers", val: nums.customers, ico: "👥", clr: BLU },
    { lbl: "Total Bookings", val: nums.bookings, ico: "📦", clr: YLW },
    { lbl: "Delivered", val: nums.delivered, ico: "✅", clr: GRN },
    { lbl: "Returns", val: nums.returned, ico: "↩️", clr: RED },
    { lbl: "COD Collected", val: "Rs." + nums.cod.toLocaleString(), ico: "💰", clr: GRN },
    { lbl: "COD Pending", val: "Rs." + nums.pending.toLocaleString(), ico: "⏳", clr: YLW },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: WHT, fontSize: 22, fontWeight: 700 }}>Welcome back, Admin! 👋</div>
        <div style={{ color: GRY, fontSize: 13, marginTop: 4 }}>KhanZxpress.pk — Admin Control Panel</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {cards.map(c => (
          <Box key={c.lbl} xtra={{ borderLeft: "3px solid " + c.clr }}>
            <div style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11, color: GRY, letterSpacing: .5, marginBottom: 6 }}>{c.lbl.toUpperCase()}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: c.clr }}>{c.val}</div>
              </div>
              <div style={{ fontSize: 28 }}>{c.ico}</div>
            </div>
          </Box>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {[{ lbl:"Customers", ico:"👥", pg:"customers", clr:BLU }, { lbl:"Bookings", ico:"📦", pg:"bookings", clr:YLW }, { lbl:"Payments", ico:"💳", pg:"payments", clr:GRN }, { lbl:"Rates", ico:"⚙️", pg:"rates", clr:RED }].map(a => (
          <button key={a.lbl} onClick={() => setPg(a.pg)}
            style={{ flex:1, background:"rgba(255,255,255,0.03)", border:"1px solid "+BLK3, borderRadius:10, padding:"14px 8px", cursor:"pointer", textAlign:"center", color:a.clr, fontFamily:"inherit" }}>
            <div style={{ fontSize:22, marginBottom:6 }}>{a.ico}</div>
            <div style={{ fontSize:12, fontWeight:600 }}>{a.lbl}</div>
          </button>
        ))}
      </div>
      <Box>
        <BoxTop title="📋 Recent Bookings" />
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr style={{ background:"#0d0d0d" }}>
              {["Tracking","Sender","Receiver","City","COD","Status","Date"].map(h => (
                <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:11, color:GRY, fontWeight:700 }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {rows.length===0 ? <tr><td colSpan={7} style={{ padding:"30px", textAlign:"center", color:GRY }}>No bookings yet</td></tr>
                : rows.map((b, i) => (
                <tr key={i} style={{ borderBottom:"1px solid "+BLK3 }}>
                  <td style={{ padding:"10px 14px", fontSize:12, color:RED, fontWeight:600 }}>{b.tracking_no}</td>
                  <td style={{ padding:"10px 14px", fontSize:12, color:WHT }}>{b.sender_name}</td>
                  <td style={{ padding:"10px 14px", fontSize:12, color:GRY2 }}>{b.receiver_name}</td>
                  <td style={{ padding:"10px 14px", fontSize:12, color:GRY2 }}>{b.receiver_city}</td>
                  <td style={{ padding:"10px 14px", fontSize:13, color:WHT, fontWeight:600 }}>Rs.{Number(b.cod_amount||0).toLocaleString()}</td>
                  <td style={{ padding:"10px 14px" }}><Chip txt={b.status} /></td>
                  <td style={{ padding:"10px 14px", fontSize:12, color:GRY }}>{b.created_at ? new Date(b.created_at).toLocaleDateString("en-PK") : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </div>
  );
}

// CUSTOMERS PAGE
function CustPage() {
  const [list, setList] = useState([]);
  const [sel, setSel] = useState(null);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    supa.from("merchants").select("*").order("created_at", { ascending:false }).then(({ data }) => { setList(data||[]); setBusy(false); });
  }, []);

  async function setStatus(id, status) {
    await supa.from("merchants").update({ status }).eq("id", id);
    setList(prev => prev.map(c => c.id===id ? {...c,status} : c));
    if (sel?.id===id) setSel(prev => ({...prev,status}));
  }

  const shown = list.filter(c => !q || [c.name,c.company,c.email,c.phone,c.city].some(v => v&&v.toLowerCase().includes(q.toLowerCase())));

  if (sel) return (
    <div>
      <button onClick={() => setSel(null)} style={{ background:"transparent", border:"1px solid "+BLK3, color:GRY2, padding:"8px 16px", borderRadius:8, cursor:"pointer", marginBottom:20, fontWeight:600, fontFamily:"inherit" }}>← Back</button>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <Box>
          <BoxTop title="👤 Personal Details" />
          <div style={{ padding:"20px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20, paddingBottom:16, borderBottom:"1px solid "+BLK3 }}>
              <div style={{ width:56, height:56, borderRadius:"50%", background:"linear-gradient(135deg,"+RED+","+RED2+")", color:WHT, fontWeight:700, fontSize:22, display:"flex", alignItems:"center", justifyContent:"center" }}>
                {sel.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <div style={{ color:WHT, fontWeight:700, fontSize:16 }}>{sel.name}</div>
                <div style={{ color:GRY, fontSize:13 }}>{sel.company}</div>
                <Chip txt={sel.status||"active"} />
              </div>
            </div>
            {[["Email",sel.email],["Phone",sel.phone],["City",sel.city],["Address",sel.address],["CNIC",sel.cnic],["Account Type",sel.account_type],["Member Since",sel.created_at?new Date(sel.created_at).toLocaleDateString("en-PK"):"-"]].map(([l,v]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid "+BLK3, fontSize:13 }}>
                <span style={{ color:GRY }}>{l}</span>
                <span style={{ color:WHT, fontWeight:600 }}>{v||"—"}</span>
              </div>
            ))}
            <div style={{ display:"flex", gap:10, marginTop:16 }}>
              <button onClick={() => setStatus(sel.id,"active")} style={{ background:"rgba(34,197,94,0.1)", color:GRN, border:"1px solid rgba(34,197,94,0.3)", padding:"6px 14px", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:12, fontFamily:"inherit" }}>✅ Activate</button>
              <button onClick={() => setStatus(sel.id,"blocked")} style={{ background:"rgba(232,0,29,0.1)", color:RED, border:"1px solid rgba(232,0,29,0.3)", padding:"6px 14px", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:12, fontFamily:"inherit" }}>🚫 Block</button>
            </div>
          </div>
        </Box>
        <Box>
          <BoxTop title="🏦 Bank Details" />
          <div style={{ padding:"20px" }}>
            <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:8, padding:"10px 14px", marginBottom:16, fontSize:12, color:"#fcd34d" }}>
              💡 Use these details to transfer COD payment to this customer
            </div>
            {[["Bank Name",sel.bank_name],["Account Title",sel.account_title],["Account Number",sel.account_no],["IBAN",sel.iban]].map(([l,v]) => (
              <div key={l} style={{ background:BLK4, borderRadius:8, padding:"12px", marginBottom:10 }}>
                <div style={{ color:GRY, fontSize:11, marginBottom:4 }}>{l.toUpperCase()}</div>
                <div style={{ color:WHT, fontWeight:600, fontSize:13, wordBreak:"break-all" }}>{v||"—"}</div>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display:"flex", gap:12, marginBottom:18 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search name, company, email, phone..."
          style={{ flex:1, background:BLK2, border:"1px solid "+BLK3, borderRadius:8, padding:"10px 14px", color:WHT, fontSize:14, outline:"none" }} />
      </div>
      <Box>
        <BoxTop title={"👥 All Customers (" + shown.length + ")"} />
        {busy ? <div style={{ padding:"40px", textAlign:"center", color:GRY }}>Loading...</div> : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr style={{ background:"#0d0d0d" }}>
                {["Name","Company","Phone","City","Bank","Status","Action"].map(h => (
                  <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:11, color:GRY, fontWeight:700, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {shown.length===0 ? <tr><td colSpan={7} style={{ padding:"40px", textAlign:"center", color:GRY }}>No customers found</td></tr>
                  : shown.map((c, i) => (
                  <tr key={i} style={{ borderBottom:"1px solid "+BLK3 }}>
                    <td style={{ padding:"10px 14px" }}>
                      <div style={{ fontSize:13, color:WHT, fontWeight:600 }}>{c.name}</div>
                      <div style={{ fontSize:11, color:GRY }}>{c.email}</div>
                    </td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:GRY2 }}>{c.company}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:GRY2 }}>{c.phone}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:GRY2 }}>{c.city}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:GRY2 }}>{c.bank_name||"—"}</td>
                    <td style={{ padding:"10px 14px" }}><Chip txt={c.status||"active"} /></td>
                    <td style={{ padding:"10px 14px" }}>
                      <button onClick={() => setSel(c)} style={{ background:RED, color:WHT, border:"none", padding:"5px 12px", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:600, fontFamily:"inherit" }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Box>
    </div>
  );
}

// BOOKINGS PAGE
function BooksPage() {
  const [items, setItems] = useState([]);
  const [flt, setFlt] = useState("All");
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    supa.from("bookings").select("*").order("created_at", { ascending:false }).then(({ data }) => { setItems(data||[]); setBusy(false); });
  }, []);

  async function updStatus(id, status) {
    await supa.from("bookings").update({ status }).eq("id", id);
    setItems(prev => prev.map(b => b.id===id ? {...b,status} : b));
  }

  function doExport() {
    const hdr = ["Tracking,Sender,Receiver,City,COD,Charges,Status,Date"];
    const rws = shown.map(b => `${b.tracking_no},${b.sender_name},${b.receiver_name},${b.receiver_city},${b.cod_amount},${b.total_charges},${b.status},${b.created_at?new Date(b.created_at).toLocaleDateString():""}`);
    const csv = [...hdr,...rws].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
    a.download = "bookings.csv"; a.click();
  }

  const sts = ["All","Booked","In Transit","Out for Delivery","Delivered","Returned"];
  const shown = items.filter(b => {
    const ms = flt==="All" || b.status===flt;
    const mq = !q || [b.tracking_no,b.receiver_name,b.sender_name,b.receiver_city].some(v => v&&v.toLowerCase().includes(q.toLowerCase()));
    return ms&&mq;
  });

  return (
    <div>
      <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap" }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search tracking, sender, receiver, city..."
          style={{ flex:1, minWidth:200, background:BLK2, border:"1px solid "+BLK3, borderRadius:8, padding:"10px 14px", color:WHT, fontSize:14, outline:"none" }} />
        <button onClick={doExport} style={{ background:GRN, color:WHT, border:"none", padding:"10px 18px", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>📥 Export CSV</button>
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap" }}>
        {sts.map(s => (
          <button key={s} onClick={() => setFlt(s)} style={{ background:flt===s?RED:"transparent", color:flt===s?WHT:GRY, border:"1px solid "+(flt===s?RED:BLK3), padding:"7px 14px", borderRadius:8, cursor:"pointer", fontSize:12, fontFamily:"inherit", fontWeight:flt===s?600:400 }}>{s}</button>
        ))}
      </div>
      <Box>
        <BoxTop title={"📦 All Bookings (" + shown.length + ")"} />
        {busy ? <div style={{ padding:"40px", textAlign:"center", color:GRY }}>Loading...</div> : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr style={{ background:"#0d0d0d" }}>
                {["Tracking","Sender","Receiver","City","COD","Charges","Status","Date","Update"].map(h => (
                  <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:11, color:GRY, fontWeight:700, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {shown.length===0 ? <tr><td colSpan={9} style={{ padding:"40px", textAlign:"center", color:GRY }}>No bookings found</td></tr>
                  : shown.map((b, i) => (
                  <tr key={i} style={{ borderBottom:"1px solid "+BLK3 }}>
                    <td style={{ padding:"10px 14px", fontSize:12, color:RED, fontWeight:600 }}>{b.tracking_no}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:WHT }}>{b.sender_name}</td>
                    <td style={{ padding:"10px 14px" }}>
                      <div style={{ fontSize:12, color:WHT }}>{b.receiver_name}</div>
                      <div style={{ fontSize:11, color:GRY }}>{b.receiver_phone}</div>
                    </td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:GRY2 }}>{b.receiver_city}</td>
                    <td style={{ padding:"10px 14px", fontSize:13, color:WHT, fontWeight:600 }}>Rs.{Number(b.cod_amount||0).toLocaleString()}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:YLW }}>Rs.{b.total_charges||"—"}</td>
                    <td style={{ padding:"10px 14px" }}><Chip txt={b.status} /></td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:GRY }}>{b.created_at?new Date(b.created_at).toLocaleDateString("en-PK"):"-"}</td>
                    <td style={{ padding:"10px 14px" }}>
                      <select value={b.status} onChange={e => updStatus(b.id,e.target.value)}
                        style={{ background:BLK, color:WHT, border:"1px solid "+BLK3, borderRadius:6, padding:"4px 8px", fontSize:11, cursor:"pointer", outline:"none", fontFamily:"inherit" }}>
                        {["Booked","In Transit","Out for Delivery","Delivered","Returned"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Box>
    </div>
  );
}

// RATE SETTINGS
function RatePage() {
  const [r, setR] = useState({ same_city:300, intercity:250, non_cod_same:200, non_cod_inter:180, fuel_charges:35, gst:16, income_tax:2, sales_tax:2 });
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supa.from("rates").select("*").single().then(({ data }) => { if(data) setR(data); });
  }, []);

  async function doSave() {
    setBusy(true);
    const { data: ex } = await supa.from("rates").select("id").single();
    if (ex) { await supa.from("rates").update(r).eq("id",ex.id); }
    else { await supa.from("rates").insert([r]); }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setBusy(false);
  }

  function NumBox({ lbl, fld, sfx }) {
    return (
      <div style={{ background:BLK4, borderRadius:10, padding:"16px", marginBottom:14 }}>
        <div style={{ color:GRY, fontSize:11, marginBottom:8, letterSpacing:.5 }}>{lbl.toUpperCase()}</div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ color:GRY2, fontSize:13, minWidth:30 }}>{sfx||"Rs."}</div>
          <input type="number" value={r[fld]} onChange={e => setR(prev => ({...prev,[fld]:Number(e.target.value)}))}
            style={{ flex:1, background:BLK2, border:"1px solid "+BLK3, borderRadius:8, padding:"10px 14px", color:WHT, fontSize:18, fontWeight:700, outline:"none", fontFamily:"inherit" }}
            onFocus={e => e.target.style.borderColor=RED}
            onBlur={e => e.target.style.borderColor=BLK3} />
        </div>
      </div>
    );
  }

  return (
    <div>
      {saved && <div style={{ background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:10, padding:"12px 20px", marginBottom:20, color:GRN, fontWeight:600 }}>✅ Rates saved! All customer portals updated.</div>}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <Box>
          <BoxTop title="💰 Delivery Charges" />
          <div style={{ padding:"20px" }}>
            <NumBox lbl="Same City — Lahore to Lahore (COD)" fld="same_city" />
            <NumBox lbl="Intercity / Outstation (COD)" fld="intercity" />
            <NumBox lbl="Same City — Non COD" fld="non_cod_same" />
            <NumBox lbl="Intercity — Non COD" fld="non_cod_inter" />
          </div>
        </Box>
        <Box>
          <BoxTop title="📊 Tax & Surcharge Rates" />
          <div style={{ padding:"20px" }}>
            <NumBox lbl="Fuel Charges %" fld="fuel_charges" sfx="%" />
            <NumBox lbl="GST %" fld="gst" sfx="%" />
            <NumBox lbl="Income Tax %" fld="income_tax" sfx="%" />
            <NumBox lbl="Sales Tax %" fld="sales_tax" sfx="%" />
          </div>
        </Box>
      </div>
      <Box xtra={{ marginTop:20 }}>
        <BoxTop title="👁️ Invoice Preview — Intercity COD Rs.5,000" />
        <div style={{ padding:"20px" }}>
          <div style={{ background:BLK4, borderRadius:10, padding:"20px" }}>
            {[
              ["Delivery Charge", "Rs. " + r.intercity],
              ["Fuel Charges (" + r.fuel_charges + "%)", "Rs. " + Math.round(r.intercity * r.fuel_charges / 100)],
              ["GST (" + r.gst + "%)", "Rs. " + Math.round(5000 * r.gst / 100)],
              ["Income Tax (" + r.income_tax + "%)", "Rs. " + Math.round(5000 * r.income_tax / 100)],
              ["Sales Tax (" + r.sales_tax + "%)", "Rs. " + Math.round(5000 * r.sales_tax / 100)],
            ].map(([l,v]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid "+BLK3, fontSize:13 }}>
                <span style={{ color:GRY }}>{l}</span>
                <span style={{ color:WHT, fontWeight:600 }}>{v}</span>
              </div>
            ))}
            <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 0 0", fontSize:16, fontWeight:700 }}>
              <span style={{ color:WHT }}>Total Charges</span>
              <span style={{ color:RED }}>Rs. {(r.intercity + Math.round(r.intercity*r.fuel_charges/100) + Math.round(5000*r.gst/100) + Math.round(5000*r.income_tax/100) + Math.round(5000*r.sales_tax/100)).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Box>
      <div style={{ marginTop:20, display:"flex", justifyContent:"flex-end" }}>
        <button onClick={doSave} disabled={busy}
          style={{ background:RED, color:WHT, border:"none", padding:"14px 32px", borderRadius:10, fontWeight:700, fontSize:16, cursor:"pointer", boxShadow:"0 4px 20px rgba(232,0,29,0.35)", opacity:busy?.7:1, fontFamily:"inherit" }}>
          {busy ? "Saving..." : "💾 Save All Rates"}
        </button>
      </div>
    </div>
  );
}

// PAYMENTS PAGE
function PayPage() {
  const [custs, setCusts] = useState([]);
  const [sel, setSel] = useState(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    async function go() {
      const [{ data: merchants }, { data: allBooks }] = await Promise.all([
        supa.from("merchants").select("*"),
        supa.from("bookings").select("*").eq("status","Delivered"),
      ]);
      const list = (merchants||[]).map(m => {
        const mb = (allBooks||[]).filter(b => b.merchant_id===m.id);
        const cod = mb.reduce((s,b) => s+Number(b.cod_amount||0), 0);
        const chg = mb.reduce((s,b) => s+Number(b.total_charges||0), 0);
        return { ...m, cnt:mb.length, cod, chg, net:cod-chg, books:mb };
      });
      setCusts(list);
      setBusy(false);
    }
    go();
  }, []);

  if (sel) return (
    <div>
      <button onClick={() => setSel(null)} style={{ background:"transparent", border:"1px solid "+BLK3, color:GRY2, padding:"8px 16px", borderRadius:8, cursor:"pointer", marginBottom:20, fontWeight:600, fontFamily:"inherit" }}>← Back</button>
      <Box>
        <div style={{ padding:"28px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:24, paddingBottom:20, borderBottom:"1px solid "+BLK3 }}>
            <div><KZLogo sz="md" /><Lines /><div style={{ color:GRY, fontSize:12, marginTop:8 }}>Lahore, Pakistan</div></div>
            <div style={{ textAlign:"right" }}>
              <div style={{ color:WHT, fontWeight:700, fontSize:18 }}>PAYMENT INVOICE</div>
              <div style={{ color:GRY, fontSize:13, marginTop:4 }}>Date: {new Date().toLocaleDateString("en-PK")}</div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:24 }}>
            {[["Client",sel.company],["Contact",sel.name],["Bank",sel.bank_name||"—"],["Account Title",sel.account_title||"—"],["Account No",sel.account_no||"—"],["IBAN",sel.iban||"—"]].map(([l,v]) => (
              <div key={l} style={{ background:BLK4, borderRadius:8, padding:"12px" }}>
                <div style={{ color:GRY, fontSize:11, marginBottom:3 }}>{l}</div>
                <div style={{ color:WHT, fontWeight:600, fontSize:13, wordBreak:"break-all" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom:24 }}>
            <div style={{ color:WHT, fontWeight:700, marginBottom:12 }}>📦 Delivered Parcels</div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr style={{ background:"#0d0d0d" }}>
                {["#","Tracking","Receiver","City","COD","Delivery","Fuel","GST","Income Tax","Sales Tax","Net"].map(h => (
                  <th key={h} style={{ padding:"8px 10px", textAlign:"left", fontSize:10, color:GRY, fontWeight:700 }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {sel.books.map((b, i) => (
                  <tr key={i} style={{ borderBottom:"1px solid "+BLK3 }}>
                    <td style={{ padding:"8px 10px", fontSize:11, color:GRY }}>{i+1}</td>
                    <td style={{ padding:"8px 10px", fontSize:11, color:RED, fontWeight:600 }}>{b.tracking_no}</td>
                    <td style={{ padding:"8px 10px", fontSize:11, color:WHT }}>{b.receiver_name}</td>
                    <td style={{ padding:"8px 10px", fontSize:11, color:GRY2 }}>{b.receiver_city}</td>
                    <td style={{ padding:"8px 10px", fontSize:11, color:WHT, fontWeight:600 }}>Rs.{Number(b.cod_amount||0).toLocaleString()}</td>
                    <td style={{ padding:"8px 10px", fontSize:11, color:YLW }}>Rs.{b.delivery_charge||0}</td>
                    <td style={{ padding:"8px 10px", fontSize:11, color:GRY2 }}>Rs.{Math.round((b.delivery_charge||0)*0.35)}</td>
                    <td style={{ padding:"8px 10px", fontSize:11, color:GRY2 }}>Rs.{Math.round(Number(b.cod_amount||0)*0.16)}</td>
                    <td style={{ padding:"8px 10px", fontSize:11, color:GRY2 }}>Rs.{b.income_tax||0}</td>
                    <td style={{ padding:"8px 10px", fontSize:11, color:GRY2 }}>Rs.{b.sales_tax||0}</td>
                    <td style={{ padding:"8px 10px", fontSize:11, color:GRN, fontWeight:600 }}>Rs.{(Number(b.cod_amount||0)-Number(b.total_charges||0)).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end" }}>
            <div style={{ background:BLK4, borderRadius:12, padding:"20px", minWidth:300 }}>
              <div style={{ color:WHT, fontWeight:700, marginBottom:12 }}>💰 Payment Summary</div>
              {[["Total Deliveries",sel.cnt+" parcels"],["Total COD","Rs."+sel.cod.toLocaleString()],["Total Charges","Rs."+sel.chg.toLocaleString()],["Net Payable","Rs."+sel.net.toLocaleString()]].map(([l,v],i) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid "+BLK3, fontSize:13, fontWeight:i===3?700:400 }}>
                  <span style={{ color:i===3?WHT:GRY }}>{l}</span>
                  <span style={{ color:i===3?GRN:WHT }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop:20 }}>
            <button onClick={() => window.print()} style={{ background:RED, color:WHT, border:"none", padding:"10px 20px", borderRadius:8, cursor:"pointer", fontWeight:600, fontFamily:"inherit" }}>🖨️ Print Invoice</button>
          </div>
        </div>
      </Box>
    </div>
  );

  return (
    <Box>
      <BoxTop title="💳 Customer Payment Summary" />
      {busy ? <div style={{ padding:"40px", textAlign:"center", color:GRY }}>Loading...</div> : (
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr style={{ background:"#0d0d0d" }}>
              {["Customer","Bank","Deliveries","Total COD","Charges","Net Payable","Action"].map(h => (
                <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:11, color:GRY, fontWeight:700, whiteSpace:"nowrap" }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {custs.length===0 ? <tr><td colSpan={7} style={{ padding:"40px", textAlign:"center", color:GRY }}>No payment data yet</td></tr>
                : custs.map((c,i) => (
                <tr key={i} style={{ borderBottom:"1px solid "+BLK3 }}>
                  <td style={{ padding:"10px 14px" }}>
                    <div style={{ fontSize:13, color:WHT, fontWeight:600 }}>{c.name}</div>
                    <div style={{ fontSize:11, color:GRY }}>{c.company}</div>
                  </td>
                  <td style={{ padding:"10px 14px", fontSize:12, color:GRY2 }}>{c.bank_name||"—"}</td>
                  <td style={{ padding:"10px 14px", fontSize:13, color:WHT, fontWeight:600 }}>{c.cnt}</td>
                  <td style={{ padding:"10px 14px", fontSize:13, color:WHT, fontWeight:600 }}>Rs.{c.cod.toLocaleString()}</td>
                  <td style={{ padding:"10px 14px", fontSize:12, color:YLW }}>Rs.{c.chg.toLocaleString()}</td>
                  <td style={{ padding:"10px 14px", fontSize:14, color:GRN, fontWeight:700 }}>Rs.{c.net.toLocaleString()}</td>
                  <td style={{ padding:"10px 14px" }}>
                    <button onClick={() => setSel(c)} style={{ background:RED, color:WHT, border:"none", padding:"5px 12px", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:600, fontFamily:"inherit" }}>View Invoice</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Box>
  );
}

// REPORTS PAGE
function RepPage() {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(true);
  const [df, setDf] = useState("");
  const [dt, setDt] = useState("");

  useEffect(() => {
    supa.from("bookings").select("*").order("created_at",{ascending:false}).then(({data}) => { setItems(data||[]); setBusy(false); });
  }, []);

  const shown = items.filter(b => {
    if (!df&&!dt) return true;
    const d = new Date(b.created_at);
    if (df&&d<new Date(df)) return false;
    if (dt&&d>new Date(dt)) return false;
    return true;
  });

  function doExport() {
    const hdr = ["Tracking,Sender,Sender City,Receiver,Receiver City,COD,Delivery,Fuel,GST,Income Tax,Sales Tax,Total,Status,Date"];
    const rws = shown.map(b => `${b.tracking_no},${b.sender_name},${b.sender_city},${b.receiver_name},${b.receiver_city},${b.cod_amount},${b.delivery_charge},${Math.round((b.delivery_charge||0)*0.35)},${Math.round(Number(b.cod_amount||0)*0.16)},${b.income_tax},${b.sales_tax},${b.total_charges},${b.status},${b.created_at?new Date(b.created_at).toLocaleDateString():""}`);
    const csv = [...hdr,...rws].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
    a.download = "report-"+new Date().toLocaleDateString()+".csv";
    a.click();
  }

  const totals = {
    all: shown.length,
    del: shown.filter(b=>b.status==="Delivered").length,
    ret: shown.filter(b=>b.status==="Returned").length,
    cod: shown.filter(b=>b.status==="Delivered").reduce((s,b)=>s+Number(b.cod_amount||0),0),
  };

  return (
    <div>
      <Box xtra={{ marginBottom:20 }}>
        <BoxTop title="📅 Filter by Date" />
        <div style={{ padding:"20px", display:"flex", gap:16, alignItems:"flex-end", flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:150 }}>
            <label style={{ display:"block", fontSize:11, color:GRY2, marginBottom:5 }}>FROM DATE</label>
            <input type="date" value={df} onChange={e=>setDf(e.target.value)}
              style={{ width:"100%", background:BLK4, border:"1px solid "+BLK3, borderRadius:8, padding:"10px 14px", color:WHT, fontSize:14, outline:"none", boxSizing:"border-box" }} />
          </div>
          <div style={{ flex:1, minWidth:150 }}>
            <label style={{ display:"block", fontSize:11, color:GRY2, marginBottom:5 }}>TO DATE</label>
            <input type="date" value={dt} onChange={e=>setDt(e.target.value)}
              style={{ width:"100%", background:BLK4, border:"1px solid "+BLK3, borderRadius:8, padding:"10px 14px", color:WHT, fontSize:14, outline:"none", boxSizing:"border-box" }} />
          </div>
          <button onClick={()=>{setDf("");setDt("");}} style={{ background:"transparent", color:GRY2, border:"1px solid "+BLK3, padding:"10px 16px", borderRadius:8, cursor:"pointer", fontFamily:"inherit" }}>Clear</button>
          <button onClick={doExport} style={{ background:GRN, color:WHT, border:"none", padding:"10px 18px", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>📥 Export Excel/CSV</button>
        </div>
      </Box>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        {[{l:"Total Parcels",v:totals.all,c:BLU},{l:"Delivered",v:totals.del,c:GRN},{l:"Returned",v:totals.ret,c:RED},{l:"Total COD",v:"Rs."+totals.cod.toLocaleString(),c:YLW}].map(s => (
          <Box key={s.l} xtra={{ borderLeft:"3px solid "+s.c }}>
            <div style={{ padding:"16px 18px" }}>
              <div style={{ fontSize:11, color:GRY, marginBottom:6 }}>{s.l.toUpperCase()}</div>
              <div style={{ fontSize:22, fontWeight:700, color:s.c }}>{s.v}</div>
            </div>
          </Box>
        ))}
      </div>
      <Box>
        <BoxTop title={"📊 Report (" + shown.length + " records)"} />
        {busy ? <div style={{ padding:"40px", textAlign:"center", color:GRY }}>Loading...</div> : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr style={{ background:"#0d0d0d" }}>
                {["Tracking","Sender","Receiver","City","COD","Total Charges","Status","Date"].map(h => (
                  <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:11, color:GRY, fontWeight:700, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {shown.slice(0,50).map((b,i) => (
                  <tr key={i} style={{ borderBottom:"1px solid "+BLK3 }}>
                    <td style={{ padding:"10px 14px", fontSize:12, color:RED, fontWeight:600 }}>{b.tracking_no}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:WHT }}>{b.sender_name}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:GRY2 }}>{b.receiver_name}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:GRY2 }}>{b.receiver_city}</td>
                    <td style={{ padding:"10px 14px", fontSize:13, color:WHT, fontWeight:600 }}>Rs.{Number(b.cod_amount||0).toLocaleString()}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:YLW }}>Rs.{b.total_charges||"—"}</td>
                    <td style={{ padding:"10px 14px" }}><Chip txt={b.status} /></td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:GRY }}>{b.created_at?new Date(b.created_at).toLocaleDateString("en-PK"):"-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Box>
    </div>
  );
}

// SUB ADMINS PAGE
function AdminsPage() {
  const [list, setList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [frm, setFrm] = useState({ name:"", email:"", password:"", role:"admin" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supa.from("admins").select("*").order("created_at",{ascending:false}).then(({data}) => setList(data||[]));
  }, []);

  async function doAdd() {
    if (!frm.name||!frm.email||!frm.password) { alert("Fill all fields"); return; }
    setBusy(true);
    const { data, error } = await supa.from("admins").insert([frm]).select().single();
    if (!error) { setList(prev => [data,...prev]); setAdding(false); setFrm({name:"",email:"",password:"",role:"admin"}); }
    setBusy(false);
  }

  async function doRemove(id) {
    if (!confirm("Remove this admin?")) return;
    await supa.from("admins").delete().eq("id",id);
    setList(prev => prev.filter(a => a.id!==id));
  }

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:20 }}>
        <button onClick={() => setAdding(!adding)} style={{ background:adding?"transparent":RED, color:adding?RED:WHT, border:"1px solid "+RED, padding:"8px 18px", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>
          {adding ? "Cancel" : "➕ Add Sub Admin"}
        </button>
      </div>
      {adding && (
        <Box xtra={{ marginBottom:20 }}>
          <BoxTop title="➕ Add New Sub Admin" />
          <div style={{ padding:"20px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>
            <TxtBox lbl="Full Name" val={frm.name} chg={v => setFrm(p=>({...p,name:v}))} />
            <TxtBox lbl="Email" val={frm.email} chg={v => setFrm(p=>({...p,email:v}))} tp="email" />
            <TxtBox lbl="Password" val={frm.password} chg={v => setFrm(p=>({...p,password:v}))} tp="password" />
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", fontSize:11, fontWeight:700, color:GRY2, marginBottom:5 }}>ROLE</label>
              <select value={frm.role} onChange={e => setFrm(p=>({...p,role:e.target.value}))}
                style={{ width:"100%", background:BLK4, border:"1px solid "+BLK3, borderRadius:8, padding:"10px 14px", color:WHT, fontSize:14, outline:"none", boxSizing:"border-box" }}>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div style={{ gridColumn:"1 / -1" }}>
              <button onClick={doAdd} disabled={busy} style={{ background:RED, color:WHT, border:"none", padding:"10px 24px", borderRadius:8, cursor:"pointer", fontWeight:700, fontSize:14, fontFamily:"inherit", opacity:busy?.7:1 }}>
                {busy?"Adding...":"✅ Add Admin"}
              </button>
            </div>
          </div>
        </Box>
      )}
      <Box>
        <BoxTop title="🔑 Sub Admins" />
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr style={{ background:"#0d0d0d" }}>
            {["Name","Email","Role","Added","Action"].map(h => (
              <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:11, color:GRY, fontWeight:700 }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {list.length===0 ? <tr><td colSpan={5} style={{ padding:"40px", textAlign:"center", color:GRY }}>No sub admins yet</td></tr>
              : list.map((a,i) => (
              <tr key={i} style={{ borderBottom:"1px solid "+BLK3 }}>
                <td style={{ padding:"10px 14px", fontSize:13, color:WHT, fontWeight:600 }}>{a.name}</td>
                <td style={{ padding:"10px 14px", fontSize:12, color:GRY2 }}>{a.email}</td>
                <td style={{ padding:"10px 14px" }}><Chip txt={a.role} /></td>
                <td style={{ padding:"10px 14px", fontSize:12, color:GRY }}>{a.created_at?new Date(a.created_at).toLocaleDateString("en-PK"):"-"}</td>
                <td style={{ padding:"10px 14px" }}>
                  <button onClick={() => doRemove(a.id)} style={{ background:"rgba(232,0,29,0.1)", color:RED, border:"1px solid rgba(232,0,29,0.2)", padding:"5px 12px", borderRadius:6, cursor:"pointer", fontSize:11, fontFamily:"inherit" }}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}

// ROOT APP
export default function AdminApp() {
  const [who, setWho] = useState(null);
  const [pg, setPg] = useState("dashboard");
  const [chk, setChk] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kzx_adm");
      if (saved) setWho(JSON.parse(saved));
    } catch(e) {}
    setChk(false);
  }, []);

  function doLogin(info) {
    try { localStorage.setItem("kzx_adm", JSON.stringify(info)); } catch(e) {}
    setWho(info);
  }

  function doLogout() {
    try { localStorage.removeItem("kzx_adm"); } catch(e) {}
    setWho(null); setPg("dashboard");
  }

  if (chk) return (
    <div style={{ minHeight:"100vh", background:BLK, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ color:RED, fontSize:18, fontWeight:700 }}>Loading KhanZxpress Admin...</div>
    </div>
  );

  if (!who) return <LoginScreen onDone={doLogin} />;

  return (
    <Shell who={who} pg={pg} setPg={setPg} doLogout={doLogout}>
      {pg==="dashboard" && <DashPage setPg={setPg} />}
      {pg==="customers" && <CustPage />}
      {pg==="bookings" && <BooksPage />}
      {pg==="payments" && <PayPage />}
      {pg==="rates" && <RatePage />}
      {pg==="reports" && <RepPage />}
      {pg==="admins" && <AdminsPage />}
    </Shell>
  );
}
