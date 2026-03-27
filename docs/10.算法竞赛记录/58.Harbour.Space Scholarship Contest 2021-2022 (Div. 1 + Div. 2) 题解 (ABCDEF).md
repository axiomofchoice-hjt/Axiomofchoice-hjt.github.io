---
title: Harbour.Space Scholarship Contest 2021-2022 (Div. 1 + Div. 2) 题解 (ABCDEF)
date: 2021-07-23 09:27:00
permalink: /pages/b9046d/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛传送门](https://codeforces.com/contest/1553)

## A. Digits Sum

显然 `S(x+1) < S(x)` 当且仅当 `x` 个位是 9，所以列个式子即可。

```cpp
#include <bits/stdc++.h>
#define repeat(i, a, b) for (int i = (a), ib = (b); i < ib; i++)
#define repeat_back(i, a, b) for (int i = (b) - 1, ib = (a);i >= ib; i--)
using namespace std;
namespace start {
    typedef long long ll; const int inf = INT_MAX >> 1; const ll INF = INT64_MAX >> 1;
        ll read() { ll x; if (scanf("%lld", &x) != 1) exit(0); return x; } // will detect EOF
        void print(ll x, bool e = 0) { printf("%lld%c", x, " \n"[e]); }
    const int N = 500010;
} using namespace start;
#define OK { puts("Yes"); return; }
#define GG { puts("No"); return; }
void Solve() {
    int n = read();
    print((n + 1) / 10, 1);
}
signed main() {
    // freopen("data.txt", "r", stdin);
    int T = 1; T = read();
    repeat (ca, 1, T + 1) {
        Solve();
    }
    return 0;
}
```

## B. Reverse String

字符串做太少了，我瞎想了个哈希。

枚举 `s` 串的的第一种操作的起点和终点，这对应了 `s` 串的一个子串，用哈希判断其是否位 `t` 串的前缀（第一个操作）。然后 `for` 循环判断 `t` 串的后缀是否合法（第二个操作）。（这个 `for` 循环也可以哈希 / `kmp`，为了手速就不写了）

```cpp
#include <bits/stdc++.h>
#define repeat(i, a, b) for (int i = (a), ib = (b); i < ib; i++)
#define repeat_back(i, a, b) for (int i = (b) - 1, ib = (a);i >= ib; i--)
using namespace std;
namespace start {
    typedef long long ll; const int inf = INT_MAX >> 1; const ll INF = INT64_MAX >> 1;
        ll read() { ll x; if (scanf("%lld", &x) != 1) exit(0); return x; } // will detect EOF
        void print(ll x, bool e = 0) { printf("%lld%c", x, " \n"[e]); }
    const int N = 500010;
} using namespace start;
#define OK { puts("Yes"); return; }
#define GG { puts("No"); return; }
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
int x = rnd() % 100;
template<typename string>
struct Hash{
    template<int b,int mod>
    struct hs{
        vector<int> a,p;
        hs(const string &s=""){
            a={0},p={1};
            for(auto c:s){
                a.push_back((1ll*a.back()*b+(c^x))%mod);
                p.push_back(1ll*p.back()*b%mod);
            }
        }
        ll q(int l,int r){
            return (a[r+1]-1ll*a[l]*p[r-l+1]%mod+mod)%mod;
        }
    };
    hs<257,1000000007> h1;
    hs<257,2147483647> h2;
    Hash(const string &s):h1(s),h2(s){}
    pair<ll, ll> query(int l,int r){
        return {h1.q(l,r),h2.q(l,r)};
    }
};
char s[N], t[N];
void Solve() {
    scanf("%s%s", s, t);
    int n = strlen(s), m = strlen(t);
    Hash<string> ss(s), tt(t);
    repeat (i, 0, m)
    repeat (j, 0, n - i)
    if (ss.query(j, j + i) == tt.query(0, i)) {
        int f = true;
        repeat (p, i + 1, m)
        if (t[p] != s[i + j - p + i]) {
            f = false;
            break;
        }
        if (f) { OK; }
    }
    GG;
}
signed main() {
    // freopen("data.txt", "r", stdin);
    int T = 1; T = read();
    repeat (ca, 1, T + 1) {
        Solve();
    }
    return 0;
}
```

## C. Penalty

非常容易可得，要么 A 球队赢要么 B 球队赢要么平（废话）。

对于前一种情况，我们要让所有 `?` 尽可能让 A 得分，至少不让 B 得分。每个球后判断 A 是否稳赢了。第二种情况也类似。

```cpp
#include <bits/stdc++.h>
#define repeat(i, a, b) for (int i = (a), ib = (b); i < ib; i++)
#define repeat_back(i, a, b) for (int i = (b) - 1, ib = (a);i >= ib; i--)
using namespace std;
namespace start {
    typedef long long ll; const int inf = INT_MAX >> 1; const ll INF = INT64_MAX >> 1;
        ll read() { ll x; if (scanf("%lld", &x) != 1) exit(0); return x; } // will detect EOF
        void print(ll x, bool e = 0) { printf("%lld%c", x, " \n"[e]); }
    const int N = 500010;
} using namespace start;
#define OK { puts("Yes"); return; }
#define GG { puts("No"); return; }
char s[N];
void Solve() {
    scanf("%s", s);
    auto cnt = array<int, 2>{0};
    int ans = 10;
    repeat (i, 0, 10) {
        if (s[i] == '1') cnt[i % 2]++;
        else if (s[i] == '?' && i % 2 == 1) cnt[1]++;
        if ((9 - i) / 2 < cnt[1] - cnt[0])
            ans = min(ans, i + 1);
    }
    cnt = array<int, 2>{0};
    repeat (i, 0, 10) {
        if (s[i] == '1') cnt[i % 2]++;
        else if (s[i] == '?' && i % 2 == 0) cnt[0]++;
        if ((9 - i + 1) / 2 < cnt[0] - cnt[1])
            ans = min(ans, i + 1);
    }
    print(ans, 1);
}
signed main() {
    // freopen("data.txt", "r", stdin);
    int T = 1; T = read();
    repeat (ca, 1, T + 1) {
        Solve();
    }
    return 0;
}
```

## D. Backspace

贪心。

显然一开始可以进行任意次 `backspace`，就不太好操作。考虑反过来，如果 `s` 最后一个字符和 `t` 最后相同，就进行匹配，否则这个字符将替换位 `backspace`（这导致这个字符和它前一个字符都从 `s` 中消失）。

```cpp
#include <bits/stdc++.h>
#define repeat(i, a, b) for (int i = (a), ib = (b); i < ib; i++)
#define repeat_back(i, a, b) for (int i = (b) - 1, ib = (a);i >= ib; i--)
using namespace std;
namespace start {
    typedef long long ll; const int inf = INT_MAX >> 1; const ll INF = INT64_MAX >> 1;
        ll read() { ll x; if (scanf("%lld", &x) != 1) exit(0); return x; } // will detect EOF
        void print(ll x, bool e = 0) { printf("%lld%c", x, " \n"[e]); }
    const int N = 500010;
} using namespace start;
#define OK { puts("Yes"); return; }
#define GG { puts("No"); return; }
#define int ll
char s[N], t[N];
void Solve() {
    scanf("%s%s", s, t);
    int n = strlen(s), m = strlen(t);
    int p = m - 1;
    repeat_back (i, 0, n) {
        if (p >= 0 && s[i] == t[p]) {
            p--;
        } else {
            i--;
        }
    }
    if (p == -1) OK;
    GG;
}
signed main() {
    // freopen("data.txt", "r", stdin);
    int T = 1; T = read();
    repeat (ca, 1, T + 1) {
        Solve();
    }
    return 0;
}
```

## E. Permutation Shift

初看真的被吓到了，什么 `shift`，还交换。但是做法真的好简单。（）

这题的关键是 `m` 的范围 `0 <= m <= n/3`。

首先，先 `shift` 再交换，还是先交换再 `shift`，其实没区别。我们先 `shift` `p` 数组，然后交换来让 `p` 变回 `identity` 排列。

排列变回 `identity` 需要的交换次数是多少？（群论的知识不多讲了，我语言能力太菜）次数是 (排列长度 - 排列分解为循环置换的个数)。

由于 `m` 最大为 `n/3`，直接可以推出 `shift` 操作后 `p_i = i` 的个数至少为 `n/3`。

所以问题就很简单了，答案的个数最多为 3，我们只要统计 `(p_i - i) mod n` 的个数。如果大于等于 `n/3`，就跑一遍把 `p` 左移 `(p_i - i) mod n` 后的排列，统计它的循环置换个数。

```cpp
#include <bits/stdc++.h>
#define repeat(i, a, b) for (int i = (a), ib = (b); i < ib; i++)
#define repeat_back(i, a, b) for (int i = (b) - 1, ib = (a);i >= ib; i--)
using namespace std;
namespace start {
    typedef long long ll; const int inf = INT_MAX >> 1; const ll INF = INT64_MAX >> 1;
        ll read() { ll x; if (scanf("%lld", &x) != 1) exit(0); return x; } // will detect EOF
        void print(ll x, bool e = 0) { printf("%lld%c", x, " \n"[e]); }
    const int N = 500010;
} using namespace start;
#define OK { puts("Yes"); return; }
#define GG { puts("No"); return; }
int Count(int a[],int n){
    static bool vis[N];
    int cnt=0;
    fill(vis,vis+n,0);
    repeat(i,0,n)if(!vis[i]){
        for(int p=a[i];p!=i;p=a[p])
            vis[p]=1;
        cnt++;
    }
    return cnt;
}
vector<int> ans;
int a[N], cnt[N];
int b[N];
void Solve() {
    ans.clear();
    int n = read(), k = read();
    fill(cnt, cnt + n, 0);
    repeat (i, 0, n) {
        a[i] = read() - 1;
        cnt[(i + n - a[i]) % n]++;
    }
    repeat (i, 0, n) {
        if (cnt[i] >= n / 3) {
            repeat (j, 0, n) b[j] = a[(j + i) % n];
            if (n - Count(b, n) <= k)
                ans.push_back(i);
        }
    }
    sort(ans.begin(), ans.end());
    print(ans.size());
    repeat (i, 0, ans.size())
        print(ans[i], i == ib - 1); 
}
signed main() {
    // freopen("data.txt", "r", stdin);
    int T = 1; T = read();
    repeat (ca, 1, T + 1) {
        Solve();
    }
    return 0;
}
```

## F. Pairwise Modulo

这题 `a_i != a_j` 太有用了，去掉我就不会做了。

把问题分为两部分：

1. 维护一个集合，支持插入 `x`，查询 `sum_{i in Set} i mod x`。
2. 维护一个集合，支持插入 `x`，查询 `sum_{i in Set} x mod i`。

对于第一个部分，先把 `i mod x` 写成 `i - x * floor(i / x)`。`sum i` 简单，`x` 是常量，`sum floor(i / x)` 可以用线段树 / 树状数组维护（单点修改，区间求和），在线段树的集合元素位置记录 1，查询 `[x, 2x-1][2x,3x-1]...`。咋一看好像 `O(n)` 次查询，实则因为 `a_i` 互不相等，所以平均 `O(log n)` 查询，复杂度 `O(n log^2 n)`。

对于第二部分，还是把 `x mod i` 写成 `x - i * floor(x / i)`。如果暴力数论分块 + 线段树，复杂度 `O(n sqrt n log n)` 过不了，所以需要反一下。考虑把 `i` 加入集合时对未来 `x` 的贡献，在 `[i, 2i-1][2i,3i-1]...` 这些位置区间加 1, 2, ...。所以就是区间加单点查询的线段树 / 树状数组，`O(n log^2 n)`。

```cpp
#include <bits/stdc++.h>
#define repeat(i, a, b) for (int i = (a), ib = (b); i < ib; i++)
#define repeat_back(i, a, b) for (int i = (b) - 1, ib = (a);i >= ib; i--)
using namespace std;
namespace start {
    typedef long long ll; const int inf = INT_MAX >> 1; const ll INF = INT64_MAX >> 1;
        ll read() { ll x; if (scanf("%lld", &x) != 1) exit(0); return x; } // will detect EOF
        void print(ll x, bool e = 0) { printf("%lld%c", x, " \n"[e]); }
    const int N = 500010;
} using namespace start;
#define OK { puts("Yes"); return; }
#define GG { puts("No"); return; }
#define int ll
struct zkw {
    const ll a0 = 0;
    int n; ll a[N * 4];
    void init(int inn, ll in[] = nullptr) { // A[x] = a0 or in[x]
        n = 1; while (n < inn) n <<= 1;
        fill(a + n, a + n * 2, a0);
        if (in) repeat (i, 0, inn) a[n + i] = in[i];
        repeat_back (i, 1, n) up(i);
    }
    void up(int x) { // private
        a[x] = a[x * 2] + a[x * 2 + 1];
    }
    void add(int x, ll k) { // A[x] += k
        x += n;
        a[x] += 1;
        while (x >>= 1) up(x);
    }
    ll sum(int l, int r) { // U(A[l, r])
        ll ans = a0; l += n - 1, r += n + 1;
        while (l + 1 < r){
            if (~l & 1) ans = (ans + a[l + 1]);
            if ( r & 1) ans = (ans + a[r - 1]);
            l >>= 1, r >>= 1;
        }
        return ans;
    }
} zkw, tr;
int ans[N];
void Solve() {
    int n = read();
    zkw.init(300000); tr.init(300000);
    ll sum = 0;
    repeat (i, 0, n) {
        int x = read(); sum += x;
        zkw.add(x, 1);
        if (i) ans[i] = ans[i - 1]; 
        ans[i] += sum;
        ans[i] += x * i - tr.sum(0, x);
        for (int j = x; j <= 300000; j += x) {
            // orz(j, j + x - 1);
            // cout << tr.qb(j, j + x - 1) << endl; pause;
            ans[i] -= zkw.sum(j, min(300000ll, j + x - 1)) * j;
            tr.add(j, j / x * x);
            tr.add(min(300000ll, j + x - 1) + 1, -j / x * x);
        }
        print(ans[i], i == n - 1);
    }
}
signed main() {
    // freopen("data.txt", "r", stdin);
    int T = 1; // T = read();
    repeat (ca, 1, T + 1) {
        Solve();
    }
    return 0;
}
```
