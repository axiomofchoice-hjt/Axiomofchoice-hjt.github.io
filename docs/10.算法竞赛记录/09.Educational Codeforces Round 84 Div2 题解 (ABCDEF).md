---
title: Educational Codeforces Round 84 Div2 题解 (ABCDEF)
date: 2020-03-24 09:05:00
permalink: /pages/a7c504/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛链接](https://codeforces.com/contest/1327)

## A. Sum of Odd Integers

上来几分钟才加载出来，切 A 又切不动 555。

一波分析发现和最小的 $k$ 个数一定是 $1,3,5,...,(2k-1)$，如果 $n$ 小于它们之和，就不行。

还有如果它们之和的奇偶性和 $n$ 不一样也不行。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=[]{ios::sync_with_stdio(0); cin.tie(0); return 0;}();
typedef long long ll;
const int N=200010;
#define int ll
int t,n,j;
signed main(){
    cin>>t;
    while(t--){
        cin>>n>>j;
        cout<<(j*(1+2*j-1)/2<=n && (j*(1+2*j-1)/2+n)%2==0?"YES":"NO")<<endl;
    }
    return 0;
}
```

## B. Princesses and Princes

题目真的长到自闭。

刚开始匹配一波，然后找两个未被匹配的输出就行了。

找不到当然直接 OPTIMAL。

辣鸡代码警告。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=[]{ios::sync_with_stdio(0); cin.tie(0); return 0;}();
typedef long long ll;
const int N=200010;
#define int ll
int t,n,j;
bool f[N],g[N]; //g表示公主被匹配，f表示王子被匹配
vector<int> a[N];
void find(){
    cout<<"IMPROVE"<<endl;
    repeat(i,0,n)if(!g[i]){cout<<i+1; break;}
    repeat(i,0,n)if(!f[i]){cout<<' '<<i+1<<endl; break;}
}
signed main(){
    cin>>t;
    while(t--){
        cin>>n;
        repeat(i,0,n)a[i].clear();
        fill(f,f+n,0);
        fill(g,g+n,0);
        int cnt=0;
        repeat(i,0,n){
            int m,x; cin>>m;
            repeat(j,0,m)cin>>x,x--,a[i].push_back(x);
            for(auto p:a[i]){
                if(!f[p]){
                    f[p]=1;
                    g[i]=1;
                    cnt++;
                    break;
                }
            }
        }
        if(cnt==n)cout<<"OPTIMAL"<<endl;
        else find();
    }
    return 0;
}
```

## C. Game with Chips

emmm 直接输入 $n,m$ 就好了，后面懒得输入，输出可以遍历所有点的走法。

我还犹豫好久。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=[]{ios::sync_with_stdio(0); cin.tie(0); return 0;}();
typedef long long ll;
const int N=200010;
#define int ll
int t,n,m;
signed main(){
    cin>>n>>m;
    string s;
    s+=string(m-1,'L');
    s+=string(n-1,'U');
    repeat(i,0,n){
        if(i%2==0)s+=string(m-1,'R');
        else s+=string(m-1,'L');
        if(i!=n-1)s+='D';
    }
    cout<<s.length()<<endl;
    cout<<s<<endl;
    return 0;
}
```

## D. Infinite Path

会循环置换应该就没问题。

首先有一个不知道叫什么名字的定理，任意一个置换都可以拆成若干个不相交的循环置换。

什么？循环置换是什么？没做专题 13 暴露了吧（huge fog）。

循环置换什么的可以找一些博客看一下，比如最简单易得的 oi-wiki：<https://oi-wiki.org/math/permutation-group/>。

因此接下来我默认大家会了这个定理：

![img](https://img2020.cnblogs.com/blog/1860292/202003/1860292-20200324012936059-1983309088.png)

我们先找到一个循环置换 $P$（所有循环置换都要执行一遍接下来的操作），长度记为 $len$，事实上 $P^k$ 其实也能进一步拆成多个小循环置换，而且恰好是 $\gcd(k,len)$ 个，当然，每个小循环置换的长度就是 $\dfrac {len} {\gcd(k,len)}$。

而且有结论 $\gcd(k,len)$ 相等的两个 $k$ 拆出来的小循环置换是一模一样的（可以 $len=6,k=1...6$ 玩一玩）。

所以我们只要让 $k$ 遍历所有 $len$ 的约数（这样的话每个 $\gcd(k,len)$ 都不相同），每次把小循环置换拿出来问它是不是只有一种颜色，如果是就更新答案。

最终复杂度是 $O(n\sqrt n)$。

辣鸡代码警告。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=[]{ios::sync_with_stdio(0); cin.tie(0); return 0;}();
typedef long long ll;
const int N=200010;
#define int ll
int t,n,m,ans;
int a[N],co[N],vis[N];
vector<int> rec,v;
bool work2(int s,int step){
    int n=rec.size();
    int p=s,nxt=(p+step)%n;
    while(nxt!=s){
        if(rec[p]!=rec[nxt])return 0;
        p=nxt,nxt=(p+step)%n;
    }
    return 1;
}
void work(){
    int n=rec.size();
    for(int i=1;i<n;i=n/(n/(i+1))) //这花里胡哨的其实是求n的所有约数
    if(n%i==0){
        repeat(j,0,i){
            if(ans<=i)return;
            if(work2(j,i)){
                ans=min(ans,i);
                return;
            }
        }
    }
    int i=n;
    repeat(j,0,i){
        if(ans<=i)return;
        if(work2(j,i)){
            ans=min(ans,i);
            return;
        }
    }
}
signed main(){
    cin>>t;
    while(t--){
        cin>>n;
        fill(vis,vis+n+1,0);
        repeat(i,1,n+1)cin>>a[i];
        repeat(i,1,n+1)cin>>co[i];
        ans=1e9;
        repeat(i,1,n+1)if(!vis[i]){
            int p=i;
            rec.clear();
            while(!vis[p]){
                rec.push_back(co[p]);
                vis[p]=co[p];
                p=a[p];
            }
            work();
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

## E. Count The Blocks

又是喜(sang)闻(xin)乐(bing)见(kuang)的计数题。

对每一个大小为 $i$ 的块，我们发现如果把它放中间，它的相邻两个数字都有 $9$ 个取值（除了和块一样的取值），剩下的 $n-i-2$ 个数字都有 $10$ 个取值，因此这个位置就计数 $81\cdot 10^{n-i-2}$ 次。

有 $n-i-1$ 个这样的位置所以额外乘以 $n-i-1$。

如果把它放边界上，就只有一个数字与它相邻，剩下的 $n-i-1$ 个数字都有 $10$ 个取值，因此这个位置就计数 $9\cdot 10^{n-i-1}$ 次。

有 $2$ 个这样的位置所以额外乘以 $2$。

当然这个块取值也有 $10$ 种，所以总共是 $10(81\cdot 10^{n-i-2}(n-i-1)+18\cdot 10^{n-i-1})$。

特判两个条件（具体看代码）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i++)
int cansel_sync=[]{ios::sync_with_stdio(0); cin.tie(0); return 0;}();
typedef long long ll;
const int N=200010;
const int mod=(0?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;} ll getinv(ll v,ll m=mod){return qpow(v,m-2,m);}
#define int ll
int t,n,m;
signed main(){
    cin>>n;
    repeat(i,1,n+1){
        ll ans=0;
        if(n-i>=2){
            ans+=mul(81*(n-i-1),qpow(10,n-i-2));
            ans+=mul(9*2,qpow(10,n-i-1));
            ans%=mod;
        }
        else if(n-i==1){
            ans+=mul(9*2,qpow(10,n-i-1));
            ans%=mod;
        }
        else ans=1;
        ans=mul(ans,10);
        cout<<ans<<' ';
    }
    return 0;
}
```

## F. AND Segments

一道 dp 题，~~dp 杀我~~。

首先每个二进制位相互不影响，所以可以拆位。

所以接下来我们讨论所有 $x_i$ 是 $0$ 或 $1$ 的情况。

根据 $\&$ 的性质可以发现，如果 $x_i=1$ 则要求 $a[l_i...r_i]$ 里全是 $1$（我们称之为第一类区间），如果 $x_i=2$ 则要求 $a[l_i...r_i]$ 里至少有一个 $0$（我们称之为第二类区间）。

这些区间相互~~勾结~~嵌套，处理这个问题比较难以入手，然而某些巨佬仍然能一眼看出 dp。

我们令 $dp[i]$ 为，如果只填前 $i$ 个数字，而且 $a[i]=0$ 的方案数。

如果 $i$ 在第一类区间内，显然 $a[i]$ 填 $0$ 填 $1$ 都不行，方案数 $dp[i]=0$。

如果 $i$ 在不在第一类区间内，在没限制情况下 $dp[i]=2dp[i-1]$，因为 $a[i-1]$ 可以填 $0$ 或 $1$。如果有限制的话，$a[i-1]=0$ 的情况肯定没事，而 $a[i-1]=1$ 就可能会出现 $a[s...i-1]$ 都是 $1$ 的方案，这连续的 $1$ 如果把某一区间覆盖了，就会凉凉。

因此我们需要判断哪些 $s$ 可以让 $[s...i-1]$ 覆盖了第二类区间，初始化让 $last[i-1]$ 存了最大的 $s$ 值即可。

所以！最终！第 $i$ 位不在第一类区间内的状态转移方程是 $dp[i]=2dp[i-1]-(dp[0]+dp[1]+dp[2]+...+dp[last[i]-1])$（$dp[0]$ 当然等于 $1$）。

其中减掉的 $dp[k]$ 表示第 $k$ 位是 $0$，第 $k$ 位以后都是 $1$ 的方案数。

这时我们用 $sum[i]$ 维护 $dp[0]+...+dp[i]$，然后 for 一遍就行了。

我基本上对着 g yz 大爹代码口胡的呜呜呜有点误差，当然代码也是 g yz 大爹的代码稍微改一下过来的。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=[]{ios::sync_with_stdio(0); cin.tie(0); return 0;}();
typedef long long ll;
const int N=500010;
const int mod=(0?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;} ll getinv(ll v,ll m=mod){return qpow(v,m-2,m);}
//#define int ll
int l[N],r[N],x[N],last[N],v[N];
ll sum[N],dp[N];
int n,m,k;
int main(){
    cin>>n>>k>>m;
    ll ans=1;
    repeat(i,0,m)cin>>l[i]>>r[i]>>x[i];
    repeat(i,0,k){
        dp[0]=sum[0]=1;
        repeat(j,1,n+2)last[j]=v[j]=0;
        repeat(j,0,m)
        if((x[j]>>i)&1){
            ++v[l[j]];
            --v[r[j]+1];
        }
        else last[r[j]+1]=max(last[r[j]+1],l[j]);
        repeat(j,1,n+2){
            v[j]+=v[j-1];
            last[j]=max(last[j],last[j-1]);
        }
        repeat(j,1,n+2){
            if(!v[j]){
                dp[j]=sum[j-1];
                if(last[j])
                    dp[j]=(dp[j]-sum[last[j]-1])%mod;
            }
            else dp[j]=0;
            sum[j]=(sum[j-1]+dp[j])%mod;
        }
        ans=ans*dp[n+1]%mod;
    }
    cout<<(ans+mod)%mod<<endl;
}
```
