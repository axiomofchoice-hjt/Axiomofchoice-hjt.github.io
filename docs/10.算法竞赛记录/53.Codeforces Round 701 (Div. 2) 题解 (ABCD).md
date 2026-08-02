---
title: Codeforces Round 701 (Div. 2) 题解 (ABCD)
date: 2021-02-13 08:52:00
permalink: /pages/10b538/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛传送门](https://codeforces.com/contest/1485)

## A. Add and Divide

大意：给两个数 `a` , `b` ，操作 1 是 `a = a / b` ，操作 2 是 `b = b + 1` ，求把 `a` 变成 0 的最小操作数。

如果先进行操作 1 再进行操作 2 ，那么效果一定不如先进行操作 1 再进行操作 2 。因此就有，所有操作 2 在操作 1 之前。因此我们只要枚举 2 操作次数（枚举 10 个就行了吧），然后暴力求 1 操作次数。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
void Solve(){
    int a=read(),b=read(),ans=1e9;
    repeat(i,0,10)if(b+i!=1){
        int n=a,t=b+i,cnt=0;
        while(n)n/=t,cnt++;
        ans=min(ans,(cnt+i));
    }
    printf("%d\n",ans);
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## B. Replace and Keep Sorted

大意：给一个严格单增序列 `a1, a2, ..., an` ，多次询问（与 `a` 的一个区间只有一个数不一样）且严格单增的序列个数。

对于一次询问的区间 `[l, r]` ，考虑修改一个数 `a[i]` 。如果 `a[i]` 不在区间边界，那么方案数显然就是 `a[i+1] - a[i-1] - 2` （把 `a[i]` 修改为 `a[i-1] + 1` 到 `a[i+1] + 1` 之间的数，除去 `a[i]` 自身）。如果 `i = l` ，那么方案数为 `a[i+1] - 2` （修改为 `1` 到 `a[i+1] - 1` 之间的数，除去 `a[i]` 自身）。如果 `i = r` ，那么方案数为 `k - a[i-1] - 1` （修改为 `a[i-1] + 1` 到 `k` 之间的数，除去 `a[i]` 自身）。

对于不在区间边界的情况，我们用前缀和维护。另外两个情况直接算就行了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
ll a[N],s[N];
void Solve(){
    int n=read(),q=read(); ll k=read();
    repeat(i,1,n+1)a[i]=read();
    a[0]=0,a[n+1]=k+1;
    repeat(i,1,n+1)s[i]=a[i+1]-a[i-1]-2;
    repeat(i,1,n+1)s[i]+=s[i-1];
    while(q--){
        int l=read(),r=read();
        if(l==r)
            printf("%lld\n",k-1);
        else
            printf("%lld\n",s[r-1]-s[l]+k-a[r-1]+a[l+1]-3);
    }
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; // T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## C. Floor and Mod

大意：给定 `x, y` ，求 `1 <= a <= x, 1 <= b <= b, floor(a / b) = a mod b` 的 `(a, b)` 个数。

列个表：

|  a,b  | a/b=1 | a/b=2 | a/b=3 | a/b=4 |
| :---: | :---: | :---: | :---: | :---: |
|  b=2  |  3,2  |       |       |       |
|  b=3  |  4,3  |  8,3  |       |       |
|  b=4  |  5,4  | 10,4  | 15,4  |       |
|  b=5  |  6,5  | 12,5  | 18,5  | 24,5  |

规律就是，每一行的 `a` 都等于列数乘以 `b + 1` ，而且只有 `b - 1` 行。显然，如果我们一行一行计算那肯定不行因为最多可能会有 1e9 行。所以思路就是一列一列计算答案。

先凑出每列的第一个有 `a = b^2 - 1` ，而每向下一个位置，`a` 都会加 `b - 1` ，用这个规律计算一列中有多少数满足要求。由于 `b^2 - 1` 增长比较快所以复杂度只有 `O(sqrt(n))` 。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
void Solve(){
    ll x=read(),y=read(),ans=0;
    for(ll i=2;i*i-1<=x && i<=y;i++){
        ans+=min((x-(i*i-1))/(i-1)+1,y-i+1);
    }
    printf("%lld\n",ans);
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## D. Multiples and Power Differences

大意：给矩阵 `a` ，求矩阵 `b` 满足 `b[i][j]` 是 `a[i][j]` 的倍数且 `b` 中相邻两个数之差是不为 0 的完全四次方数。

这题想到就很简单，不想到就会像我一样卡住（）。

首先我们需要发现 `1` 到 `16` 的最小公倍数是 720720 在范围内。这个数是所有 1..16 的倍数，所以我们可以把一部分互不相邻的数变成 720720 ，其他的数也要互不相邻。（没错这就是传说中的奇偶染色）对于后者来说，假设 `a[i][j]` 相邻的数都是 720720 ，那么只要让 `a[i][j]` 变成 `720720 + a[i][j]^4` 就行了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)!=1)exit(0); return x;}
void Solve(){
    ll c=720720;
    int n=read(),m=read();
    repeat(i,0,n)
    repeat(j,0,m){
        int x=read(),ans;
        if((i+j)%2==0)ans=c;
        else ans=c+x*x*x*x;
        printf("%d%c",ans," \n"[j==m-1]);
    }
}
signed main(){
    // freopen("data.txt","r",stdin);
    int T=1; // T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```
