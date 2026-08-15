---
title: HDOJ1384 Intervals 题解
date: 2020-02-26 07:32:00
permalink: /pages/b36752/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[题目链接](http://acm.hdu.edu.cn/showproblem.php?pid=1384)

大意：有 $n$ 个区间 $[a_i,b_i]$，每个区间有个权值 $c_i$，找到一个最小的整数集合 $U$ 满足，任意 $i$ 都有 $[a_i,b_i]∩U$ 的元素个数大于等于 $c_i$，求 $U$ 元素个数。

（$1\le n \le 50000$，$0\le a_i \le b_i \le 50000$，$1\le c_i \le b_i-a_i+1$）

网上找了找发现都是差分约束的题解，我用树状数组+并查集过了，于是就有了这篇~~辣鸡~~题解。

思路简单来说就是贪心，每次找到右端点最小的区间 $[a_i,b_i]$，令 $cnt$ 为这个区间内已经存在的点数，从 $b_i$ 开始往前找 $c_i-cnt$ （小于等于 $0$ 就不用管啦）个未被选取的点，选取之。

那么并查集有啥用呢？就是快速找到未选取的元素（因为选了的元素被合并了）。

复杂度 $O(n\log W+W)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define mst(a,x) memset(a,x,sizeof(a))
inline ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=50010;
const int mod=(1?1000000007:998244353);
#define lb(x) (x&(-x))
struct BIT{ //树状数组
    ll t[N];
    void add(ll x,ll k){
        x++;
        for(;x<=50009;x+=lb(x))
            t[x]+=k;
    }
    ll sum(ll x){
        x++;
        ll ans=0;
        for(;x!=0;x-=lb(x))
            ans+=t[x];
        return ans;
    }
}bit;
struct DSU{ //并查集
    int a[N];
    void init(int n){iota(a,a+n+1,0);}
    int fa(int x){return a[x]==x?x:a[x]=fa(a[x]);}
    inline int &operator[](int x){return a[fa(x)];}
}d;
struct node{
    int l,r,w;
    bool operator<(const node &b)const{
        return r<b.r; //按右端点排序
    }
}a[N];
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    while(1){
        int n=read();
        repeat(i,0,n){
            a[i].l=read()+2;
            a[i].r=read()+2;
            a[i].w=read();
        }
        sort(a,a+n);
        mst(bit.t,0);
        d.init(N-1);
        int ans=0;
        repeat(i,0,n){
            auto x=a[i];
            int cnt=bit.sum(x.r)-bit.sum(x.l-1); //区间中已被选取的元素个数
            int k=d[x.r];
            while(cnt<x.w){
                bit.add(k,1); //选取k
                d[k]=d[k-1]; //删除k
                k=d[k]; //查找k之前第一个未被删除的元素
                ans++,cnt++;
            }
        }
        printf("%d\n",ans);
    }
    return 0;
}
```

然后差分约束的解法不算难（~~但是我没看出来~~），别的题解讲挺清楚的我就不写了。
